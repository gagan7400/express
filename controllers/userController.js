let bcrypt = require("bcrypt");
let userModel = require("../models/userModel");
const { MAILSEND } = require("../utils/SendEmail");
let register = async (req, res) => {
    try {
        let { name, email, password, state, mobilenumber } = req.body;
        if (!name || !email || !password || !state || !mobilenumber) {
            return res.status(404).json({ success: false, message: "pls provide all the details" })
        }

        let olduser = await userModel.findOne({ email });
        if (olduser) {
            return res.status(404).json({ success: false, message: "email already exist" })
        }
        let hashpassword = await bcrypt.hash(password, 10);

        let newuser = await userModel.insertOne({ name, email, password: hashpassword, state, mobilenumber });
        await MAILSEND(email, "Registration", "RegistrationDone", "<h1> DONE </h1>")
        res.status(200).json({ success: true, message: "registration done", data: newuser })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



let login = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ success: false, message: "pls provide all the details" })
        }
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "pls provide valid credentials" })
        }
     await MAILSEND(email, "LOGIN", "Login successfully done" , `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Successful Login Notification</title>
    <style>
        /* Mobile responsive adjustments */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                padding: 10px !important;
            }
            .content-padding {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

    <!-- Outer Wrapper -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 40px 0;">
        <tr>
            <td align="center">
                
                <!-- Main Email Card (Max-width 600px for email safety) -->
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border-collapse: collapse;">
                    
                    <!-- Header/Logo Section -->
                    <tr>
                        <td align="center" style="padding: 30px 40px 20px 40px; background-color: #ffffff; border-bottom: 1px solid #eaeaea;">
                            <!-- Replace with your company brand logo logo -->
                            <img src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=" alt="Company Logo" width="150" height="40" style="display: block; border: 0; max-width: 100%; height: auto;">
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td class="content-padding" style="padding: 40px;">
                            <h1 style="margin-0 0 20px 0; color: #1a1a1a; font-size: 22px; font-weight: 700; line-height: 1.3;">
                                New login detected
                            </h1>
                            
                            <p style="margin: 0 0 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.5;">
                                Hello <strong>${user.name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.5;">
                                We noticed a successful login to your account. If this was you, no further action is required.
                            </p>

                            <!-- Login Meta Details Box -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding-bottom: 10px; font-size: 14px; color: #718096; width: 100px;"><strong>Time:</strong></td>
                                    <td style="padding-bottom: 10px; font-size: 14px; color: #2d3748;">${user.createdAt}</td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 10px; font-size: 14px; color: #718096;"><strong>Device:</strong></td>
                                    <td style="padding-bottom: 10px; font-size: 14px; color: #2d3748;">{{device}}</td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 10px; font-size: 14px; color: #718096;"><strong>Location:</strong></td>
                                    <td style="padding-bottom: 10px; font-size: 14px; color: #2d3748;">{{location}}</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 14px; color: #718096;"><strong>IP Address:</strong></td>
                                    <td style="font-size: 14px; color: #2d3748;">{{ip_address}}</td>
                                </tr>
                            </table>

                            <!-- Security CTA Section -->
                            <p style="margin: 0 0 16px 0; color: #e53e3e; font-size: 15px; font-weight: 600; line-height: 1.5;">
                                wasn't you?
                            </p>
                            <p style="margin: 0 0 24px 0; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                                If you don't recognize this activity, your password may be compromised. Please secure your account immediately by changing your password.
                            </p>

                            <!-- Secure Account Button -->
                            <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 10px auto;">
                                <tr>
                                    <td align="center" bgcolor="#e53e3e" style="border-radius: 4px;">
                                        <a href="{{password_reset_url}}" target="_blank" style="padding: 12px 24px; display: inline-block; font-size: 15px; color: #ffffff; font-weight: 600; text-decoration: none; border-radius: 4px;">
                                            Secure Your Account
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td align="center" style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #eaeaea; font-size: 12px; color: #888888; line-height: 1.5;">
                            <p style="margin: 0 0 8px 0;">This is an automated security notification regarding your account.</p>
                            <p style="margin: 0 0 16px 0;">© 2026 Your Company Inc. All rights reserved.</p>
                            <p style="margin: 0;">
                                <a href="{{support_url}}" style="color: #3182ce; text-decoration: underline;">Contact Support</a> | 
                                <a href="{{privacy_url}}" style="color: #3182ce; text-decoration: underline;">Privacy Policy</a>
                            </p>
                        </td>
                    </tr>

                </table>
                
            </td>
        </tr>
    </table>

</body>
</html>
`)
        res.status(200).json({ sucess: true, message: "login successfull" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

let logout = (req, res) => {
    res.send("logout done")
}
let getalluser = async (req, res) => {



}

module.exports = { register, login, logout, getalluser }


// basic server
// how to create an api
// middleware
// rotuing (app.method, app.use,app.all, router.method(in rotues file))
// req , res , next
// serving static files
// how to install nd setup mongodb
// how to conect mongobdriver with nodejs
// how to connect with mongoose driver