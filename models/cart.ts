import mongoose, {Schema, model, models} from 'mongoose';

const CartSchema: mongoose.Schema = new Schema({
    userId: {
        type: String,
        
    },
    items: {
        id: String,
        image: String,
        name: String,
        price: Number,
        quantity: Number
    }
});

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;