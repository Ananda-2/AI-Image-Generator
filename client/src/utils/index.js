import { surpriseMePrompts } from "../constant";
import FileSaver from 'file-saver'

export function GetRandomPrompt(prompt){
    const randomPromptIndex = Math.floor(Math.random()*(surpriseMePrompts.length )) ;
    const randomPrompt = surpriseMePrompts[randomPromptIndex] ;


    return randomPrompt ;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpeg`) ;
}