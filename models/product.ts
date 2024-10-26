import mongoose, {Schema, model, models} from 'mongoose';

const ProductSchema: mongoose.Schema = new Schema({

    id: {
        type: String,
        unique: [true, "This ID already exists"],
        required: [true]
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating_value: {
        type: Number
    },
    rating_count: {
        type: Number
    }
});


const Product = models.Product || model('Product', ProductSchema);

export default Product;