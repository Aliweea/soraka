export default ($resource, BASE_URL) => {
    'ngInject';
    return {
        /**
        * 获取所有二级界面对应chartskpi数据
        * @RequestHeaders: X-Auth-Token
        * @RequestParams: start&end
        */
        spankpi: (headers) => {
            return $resource(BASE_URL+'/kpi/result/span/:kpiID', {kpiID: '@kpiID'}, {
                get: {
                    method: 'GET',
                    headers: headers,
                }
            });
        },
    };
};