/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 14:46
 */
import {HolderResponce} from './holder-responce';

export class IcoPageResponse {
  totalSupplyTokens: string;
  soldTokens: string;
  soldEquity: string;
  holdersCount: string;
  holders: HolderResponce[];
}
