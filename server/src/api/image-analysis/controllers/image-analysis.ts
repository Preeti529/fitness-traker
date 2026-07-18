import {Context } from 'koa';
import {analyzeImage} from '../services/gemini';

export default {
    async analyze(ctx:Context){
        const file=ctx.request.files?.image as any;
 if(!file) return ctx.badRequest('No image file provided');

 const filePath=file.filepath;

 try{
    const result=await analyzeImage(filePath);
    return ctx.send({success:true,result});

 }
 catch(error){
   
   //  ctx.internalServerError('Image analysis failed',{error:error.message})
   ctx.internalServerError('Image analysis failed', {error: error instanceof Error ? error.message : String(error)})

 }
    }
}