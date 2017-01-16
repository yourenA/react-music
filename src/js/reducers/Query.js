/**
 * Created by Administrator on 2017/1/12.
 */
import { KEYWORDCHANGE,REQUESTKEYWORDQUERY,RECEIVEKEYWORDQUERY,KEYWORDQUERYFAIL } from '../Constants/ActionType.js';
import objectAssign from 'object-assign';
const initKeywordSearchList = {
    keyword: '',
    isFetching: false,
    length: 0,
    success: true,
    result: []
}
export default function queryState(preState=initKeywordSearchList,action) {
    switch(action.type){
        case REQUESTKEYWORDQUERY:
            return objectAssign({},preState,{isFetching:action.isFetching,keyword:action.keyword});
        case RECEIVEKEYWORDQUERY:
            if (preState.keyword === action.keyword){
                return objectAssign({},preState,{
                    length: action.length,
                    isFetching: action.isFetching,
                    displaykeyword: action.keyword,
                    result: action.result,
                    success: action.success
                })
            }else{
                return preState
            }
        case KEYWORDQUERYFAIL:
            if(preState.keyword === action.keyword){
                return objectAssign({},preState,{
                    isFetching: action.isFetching,
                    success: action.success
                })
            }
        default:
            return preState;
    }
};