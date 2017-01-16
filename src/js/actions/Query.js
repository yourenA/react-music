/**
 * Created by Administrator on 2017/1/12.
 */
import { KEYWORDCHANGE,REQUESTKEYWORDQUERY,RECEIVEKEYWORDQUERY,KEYWORDQUERYFAIL } from '../Constants/ActionType.js';
import { CONFIG } from '../Constants/Config.js';
import { trim} from '../util/tool.js';
import fetchJSONP from 'fetch-jsonp';

function receiveKeywordQuery(keyword,json){
    let result = json.song_list;
    return {
        type: RECEIVEKEYWORDQUERY,
        length: result.length,
        keyword: keyword,
        result: result,
        success:true
    };
}
export function keywordQuery(keyword){
    return (dispatch,getState) => {
        keyword = trim(keyword);
        if(keyword===''){
            return null;
        }
        let curState = getState().queryState;
        if(curState.keyword===keyword&&(curState.success||curState.isFetching)){
            return null;
        }
        dispatch({
            type: REQUESTKEYWORDQUERY,
            isFetching: true,
            keyword: keyword,
        });
        let url = `${CONFIG.base_url}?method=${CONFIG.query_method}&query=${keyword}&page_no=&page_size=200`;
        return fetchJSONP(url,{
            timeout: 30000,
            jsonpCallback: "callback"
        })
            .then(response=> response.json())
            .then(json =>
                dispatch(receiveKeywordQuery(keyword,json))
            ).catch(e => {
                console.log(e);
                return dispatch({
                    type: KEYWORDQUERYFAIL,
                    isFetching: false,
                    success: false,
                    keyword: keyword
                });
            });
    };
}