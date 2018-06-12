import merge from 'lodash.merge';

export const GET_NEWS_LIST = 'GET_NEWS_LIST';
export const GET_TOP_NEWS = 'GET_TOP_NEWS';

const baseUrl = 'http://openapi.inews.qq.com/';

export const CGI_PATH = {
    [GET_TOP_NEWS]: baseUrl + 'getQQNewsIndexAndItems',
    [GET_NEWS_LIST]: baseUrl + 'getQQNewsNormalContent',
};

export function loadTopNews() {
    let urlName = GET_TOP_NEWS,
        opts = {};

    let pa = merge({}, {
        chlid: 'news_news_top',
        refer: 'mobilewwwqqcom',
        otype: 'jsonp',
        jsonCbName: 'getNewsIndexOutput',
        t: (new Date()).getTime()
    });

    let param = {
        param: pa,
        url: CGI_PATH[urlName],
        ajaxType: 'JSONP',
        onSuccess: (data) => {

        },
        onError: (res) => {

        }
    };

    this.props.request(urlName, param, opts);
}

export function loadNewsList() {
    let urlName = GET_NEWS_LIST,
        opts = {};

    let listInfoParam = this.props.news.listInfo['listLatest'],
        ids = this.props.news.ids;

    // 防止重复拉取
    if (listInfoParam.isLoading) {
        return;
    }

    let curPage = listInfoParam.curPage,
        pageSize = listInfoParam.pageSize,
        startIndex = 0 + (curPage - 1) * pageSize,
        endIndex = startIndex + pageSize;

    let newIds = ids.slice(startIndex, endIndex),
        newIdArray = [];

    newIds.forEach((item, index) => {
        newIdArray.push(item.id);
    });

    let pa = merge({}, {
        cmd: GET_NEWS_LIST,
        ids: newIdArray.join(','),
        refer: 'mobilewwwqqcom',
        otype: 'jsonp',
        jsonCbName: 'getNewsContentOnlyOutput',
        t: (new Date()).getTime()
    });

    let param = {
        param: pa,
        url: CGI_PATH[urlName],
        ajaxType: 'JSONP',
        onSuccess: (data) => {

        },
        onError: (res) => {

        }
    };

    this.props.request(urlName, param, opts);
}
