let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let hms = `${hours}:${minutes}:${seconds}`

let consumptionSchema = new Schema({
    location: {
        type: String,
        enum: ["Coorg", "Kabini", "Hampi"],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeofrecording: {
        type: String,
        default: hms
    },
    keb: {
        type: Number,
        required: true
    },
    generator: [{
        generatorname: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        generation: {
            type: Number,
            required: true
        },
        timerun: {
            type: String,
            required: true
        },
        dieselconsumption: {
            type: Schema.Types.Decimal128,
            required: true
        }

    }],
    kitchenpng: {
        type: Number,
        required: true
    },
    total: {
        type: Array,
        required: true
    },
    waterconsumption: {
        type: Number,
        required: true
    },

    weathermin: {
        type: Number,
        required: true
    },
    weathermax: {
        type: Number,
        required: true
    },
    humidity: {
        type: String,
        required: true
    },
    kebrate: {
        type: Schema.Types.Decimal128,
        required: true
    },
    fuelrate: {
        type: Schema.Types.Decimal128,
        required: true
    },
    waterrate: {
        type: Schema.Types.Decimal128,
        required: true
    },
    pngrate: {
        type: Schema.Types.Decimal128,
        required: true
    },
    solargeneration: {
        type: Number,
        required: true
    }

}
    // {
    //     writeConcern: {
    //         w: 'majority',
    //         j: true,
    //         wtimeout: 1000
    //     }
    // }, 
);


module.exports = mongoose.model('Consumption', consumptionSchema);