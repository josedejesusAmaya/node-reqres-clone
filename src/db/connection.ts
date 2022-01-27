import mongoose from 'mongoose';

const connect = async(): Promise<boolean> => {
    try {
        await mongoose.connect(process.env.MONGODB_ADDON_URI!);
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

export default connect;
