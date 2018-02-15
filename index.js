const slaveRouter = require('./lib/slaveRouter');
const master = require('./lib/master');

const CAMERA_PLACEMENT = process.env.CAMERA_PLACEMENT
const ROLE = process.env.ROLE
if(!process.env.ROLE){
    console.log("Please specify ROLE as either SLAVE or MASTER in env-vars")
    process.exit()
}

if(!process.env.CAMERA_PLACEMENT){
    console.log("Please specify CAMERA_PLACEMENT as either 1, 2, 3, 4 in env-vars")
    process.exit()
}

if(ROLE == "SLAVE"){
    slaveRouter();
}else{
    master();
}