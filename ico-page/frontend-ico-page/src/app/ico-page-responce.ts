/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 14:46
 */
import {HolderResponce} from './holder-responce';

export class IcoPageResponce {
  totalSupplyTokens: string;
  soldTokens: string;
  holdersCount: string;
  holders: HolderResponce[];
}
