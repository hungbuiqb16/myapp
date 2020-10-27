const nodemailer = require('nodemailer')

const sendMail = (to,subject,htmlContent) => {
   
	const tranporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, //true if use SSL, 465(smtps)
		auth: {
			user: 'hungmanucian1@gmail.com',
			pass: 'pzsdifdioyhddoij',
		},
	})
	//return Promise -  send mail with defined transport object
    return tranporter.sendMail({
    	from: 'Noreply 👻 <noreply@example.com>', // sender address
    	to: to, // list of receivers
    	subject: subject, // subject line
    	text: 'Plantext version of the message', //plain text body
    	html: htmlContent // html body
    })
}

module.exports = {
	sendMail: sendMail
}
