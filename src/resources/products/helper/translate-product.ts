import {Translate} from "../../../helpers/translator";
import {Languages} from "../../../helpers/consts";

export async function translateProduct(notes, lang, noteName) {
    let languageType = Languages[lang]
    const noteNames = notes.map(i=> (i.name))
    const splitSymbol = lang == 'AR' ? '،' : ','
    const translatedNotesInfo = await Promise.all([Translate(noteNames, languageType), Translate(noteName, languageType)])
    const translatedNames = (translatedNotesInfo[0]).split(splitSymbol)
    const translatedCategoryName = translatedNotesInfo[1]

    return notes.reduce((acc,i, index)=>{
        acc.push({...i, name: translatedNames[index], category_name: translatedCategoryName, img: (Object.values(i.img))[0]})
        return acc
    },[])
}