import { FormControl, ValidationErrors } from "@angular/forms";

export class AlaeldinShopValidator {

    static notOnlyWhiteSpace(controll : FormControl):ValidationErrors{
    if((controll.value !=null)&&((controll.value.trim().length ===0))){
   return{'not Only white Space':true}
    }

        return {};
    }
}
