import { Webhook } from "svix";
import User from "../models/User.js";

// API controller functions to manage Clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    // Create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    //Getting data from req.body
    const { data, type } = req.body;

    // Write/delete user data in database
    switch (type) {
      case 'user.created': {
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        });
        res.json({});
        break;
      }
      case 'user.updated': {
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url
        });
        res.json({});
        break;
      }
      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Webhooks error: ' + error.message });
  }
}