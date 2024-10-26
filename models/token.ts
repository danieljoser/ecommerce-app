import mongoose, {Schema, model, models} from 'mongoose';

const TokenSchema: mongoose.Schema = new Schema({

    email: {
        type: String,
    },
    token: {
        type: String
    },
    expires: {
        type: Date
    }
});

TokenSchema.index({email: 1, token:1}, {unique: true});

const Token = models.Token || model('Token', TokenSchema);

export default Token;