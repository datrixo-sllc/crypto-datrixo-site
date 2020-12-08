/**
 * Created by Yuri Nikiforov.
 * Date: 06.10.2020
 * Time: 12:13
 */
import {Allergen} from '../allergens/allergen';

export class Ingredient {
    id: number;
    name: string;
    description: string;
    allergens: Allergen[];
}
