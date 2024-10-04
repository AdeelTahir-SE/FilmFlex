"use server"
export default async function handleSubscription(event){
    const formData = new FormData(event.target);
    
  const email =formData.get("email");
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail service
    auth: {
      user: process.env.ServerEamil, // Your Gmail address
      pass: process.env.AppPassword, // Use app password if 2FA is enabled, or your Gmail password
    },
  });
  
    await transporter.sendMail({
        from: 'Adeel Tahir', // Sender address
        to: email, email,
        subject: "Subscribed to Newsletter ✔", // Subject line
        text: "Thank you for subscribing!", // Plain text body
        html: "<b>Now you will get the latest updates on new movies and special offers.</b>", // HTML body
      });

  

}