export default ($resource, BASE_URL) => {
    'ngInject';
    return {
        /**
        * 获取所有的kpi数据
        * @RequestHeaders: X-Auth-Token
        * @RequestParams: currentDate
        */
        kpi: (headers) => {
            return $resource(BASE_URL+'/kpi/result/all', {}, {
                get: {
                    method: 'GET',
                    headers: headers,
                }
            });
        },
        /**
        * 获取单个标签的kpi数据
        * @RequestHeaders: X-Auth-Token
        * @RequestParams: currentDate; categoryId
        */
        categorykpi: (headers) => {
            return $resource(BASE_URL+'/kpi/result/category/:categoryId', {categoryId: '@categoryId'}, {
                get: {
                    method: 'GET',
                    headers: headers,
                }
            });
        },
        /**
        * 获取单条kpi数据
        * @RequestHeaders: X-Auth-Token
        * @RequestParams: currentDate; kpiId
        */
        singlekpi: (headers) => {
            return $resource(BASE_URL+'/kpi/result/kpi/:kpiId', {kpiId: '@kpiId'}, {
                get: {
                    method: 'GET',
                    headers: headers,
                }
            });
        },
        /**
        * 获取所有模块的categories（标签）
        * @RequestHeaders: X-Auth-Token
        * @RequestParams: null
        */
        blueMap: (headers) => {
            return $resource(BASE_URL+'/kpi/blueMap', {}, {
                get: {
                    method: 'GET',
                    headers: headers,
                }
            });
        },
    };
};