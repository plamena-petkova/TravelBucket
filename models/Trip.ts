import { Schema, model, models } from "mongoose";

const TripSchema = new Schema(
  {
   owner: {
    type: Schema.Types.ObjectId,
    ref:'User'
   },
   name: {
    type:String, 
    required:true
   },
   description: {
    type:String, 
   },
   location: {
   city:String, 
   country:String,
   continent:String,
   },
   people: {
    type:Number,
    required:true
   }, 
   events: [
    {
    type:String
   }
],
   images:[{
    type:String
   }]
  },
  {
    timestamps: true,
  }
);

const Trip = models.Trip || model('Trip', TripSchema);

export default Trip;
