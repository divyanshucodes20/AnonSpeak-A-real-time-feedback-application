import {z} from 'zod'
export const messageSchema=z.object({
    content:z.string()
    .min(10,{message:'conetent must be of atleast 10 characters'})
    .min(300,{message:'conetent must be betweeen 10 to 300 characters'})
})