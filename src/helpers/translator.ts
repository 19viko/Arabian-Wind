const translate = require('@iamtraction/google-translate');
import {BadRequestException} from "@nestjs/common";

export function Translate(text, lang): Promise<string> {
    return translate(text, { to: lang }).then(res => {
        return res.text;
    }).catch(err => {
        throw new BadRequestException(err.message)
    });
}