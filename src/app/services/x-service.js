export default ($state) => {
  'ngInject';
    return {
        h: (n, a) => {
            for (var i = a.length - 1; i >= 0; i--) $('#' + n + a[i]).hide(0);
        },
        s: (n, a) => {
            for (var i = a.length - 1; i >= 0; i--) $('#' + n + a[i]).show(0);
        },
        o: (o) => {
            for (let k in o) {
                $("#m"+k).click(() => {
                    switch (k) {
                        case "1": $state.go("app.economy.economylist",{"categoryId": o[k]}); break;
                        case "2": $state.go("app.environment.environmentlist",{"categoryId": o[k]}); break;
                        case "3": $state.go("app.livehood.livehoodlist",{"categoryId": o[k]}); break;
                        case "4": $state.go("app.publicsecurity.publicsecuritylist",{"categoryId": o[k]}); break;
                        case "5": $state.go("app.cm.cmlist",{"categoryId": o[k]}); break;
                        case "6": $state.go("app.publicService.publicServicelist",{"categoryId": o[k]}); break;
                    }
                })
            }
        }
    }
}