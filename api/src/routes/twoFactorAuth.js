const server = require("express").Router();
const jwt = require("jsonwebtoken");
const {User} = require("../db.js");
const Vonage = require('@vonage/server-sdk')

//Variables usadas para envío de sms
const vonage = new Vonage({
  apiKey: "d1d5cd67",
  apiSecret: "DjivGpVI8mxXEGdl"
})
//
server.post('/login/:token/:code',async (req,res)=>{

    const twoToken = req.params.token
    const code = req.params.code

    try{
        const decoded = jwt.verify(twoToken, "secret_key");

        if(decoded.code == code){

            const user = await User.findByPk(decoded.id)

            if(user){
                //create token
						let token = jwt.sign({ id: user.id }, "secret_key", {
							expiresIn: 60 * 60 * 24,
						});
						user.password = "";
						return res.json({
							user: user,
							auth: true,
							token,
						});
            }else{
                res.json({auth:false,
                    msg:'No se encontró el usuario'})
            }

        }else{
            res.json({auth:false,
                      msg:'Código inválido'})
        }
    }catch (err){
        console.log(err)
        res.json({auth:false,
                  msg:'El código expiró'})
    }
    
})

server.post('/send/:number/:id',async (req,res)=>{

    var code = Math.trunc(Math.random()*10000)

    const id = req.params.id

	const from = "Andres"
	const to = req.params.number
    const text = `Tu codigo de verificacion de ArtHub es ${code}`  

	vonage.message.sendSms(from, to, text, (err, responseData) => {
		if (err) {
			console.log(err);
			return res.json(err)
		} else {
			if(responseData.messages[0]['status'] === "0") {

				let twoToken = jwt.sign({code,id}, "secret_key", {
					expiresIn: 60 })

				return res.json({ authTwo:true,
								  twoToken})

			} else {
				return res.json(`Message failed with error: ${responseData.messages[0]['error-text']}`)
			}
		}
	})
})

server.post('/verify',async (req,res)=>{

    const {twoToken,code,number} = req.body

    try{
        const decoded = jwt.verify(twoToken, "secret_key");

        if(decoded.code == code){

            await User.findByPk(decoded.id)
            .then(user=>{
                user.twoFactor = 'X'
                user.phoneNumber = number.toString()
                user.save()
            })

            res.json({authTwo:true})

        }else{
            res.json({authTwo:false,
                      msg:'Código inválido'})
        }
    }catch (err){
        console.log(err)
        res.json({authTwo:false,
                  msg:'El código expiró'})
    }

})

server.post('/deactivate/:id',async (req,res)=>{
    try{

        await User.findByPk(req.params.id)
            .then(user=>{
                user.twoFactor = ''
                user.phoneNumber = ''
                user.save()
            })

            res.json({done:true})

    }catch (err){
        console.log(err)
        res.json({done:false})
    }

})

module.exports = server;