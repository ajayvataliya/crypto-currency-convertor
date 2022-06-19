const jwt = require("jsonwebtoken");
const {JWT} = require("../config");
const {User} = require("../v1/models");
const mapData = (data, message = '') => {
    return {
        success: true,
        code: 200,
        message,
        data,
        error: null
    }
}

const mapError = (error, code = 500) => {
    return {
        success: false,
        code,
        message: error?.message || '',
        data: null,
        error
    }
}

const Authenticate = async (token) => {
    try{
        const customError = new Error();
        customError.code = 401;
        if (!token) {
            customError.message = 'Unauthorized';
            throw customError
        }

        const verifyToken = jwt.verify(token, JWT.secret);

        const rootUser = await User.findOne({_id: verifyToken._id}).lean();

        if(!rootUser) {
            customError.message = 'User not Found';
            throw customError
        }

        rootUser.isAdmin = rootUser.role === 'ADMIN';
        delete rootUser.addresses;
        delete rootUser.password;
        delete rootUser.__v;
        return  rootUser;

    }catch (err) {
        console.log(err);
        return null
    }

}

exports.init = () => {
    global.io.on('connection' , (socket) => {
        console.log('user connected - ' + socket.id)

        Authenticate(socket.request._query.token).then(res => {
          if (res) {
              this.emitToSocketId(socket.id, 'connectionResponse', mapData(res, 'Socket connected.'))
          } else {
              this.emitToSocketId(socket.id, 'connectionResponse', mapError(new Error('User not found')))
          }
        })

    })
}

exports.broadcast = (event, data) => {
    global.io.emit(event, mapData(data))
}

exports.emitToSocketId = (socketId, eventName, data) => {
    global.io.to(socketId).emit(eventName, data);
};
