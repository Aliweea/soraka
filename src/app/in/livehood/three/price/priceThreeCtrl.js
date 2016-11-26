'use strict'
export default ($scope, qService, generalService, dataDetailFactory, $http, $rootScope, $location) => {
   'ngInject';
 //  $(".insurance2detail").hide(0);
//    var token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMyIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNCIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiNSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiNiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjciLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjgiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn0seyJAaWQiOiI5IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxMCIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMSIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIxNSIsImlkIjoxNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM2OjMwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM2OjMwIiwibmFtZSI6IuWbveWcn+WxgCIsImRlc2NyaXB0aW9uIjoiR1RKX+WbveWcn+WxgCJ9LHsiQGlkIjoiMTYiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjE4IiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIxOSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIyMCIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjI4LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJuYW1lIjoi5Z+O566h5bGAIiwiZGVzY3JpcHRpb24iOiJDR0pf5Z+O566h5bGAIn1dfSwiZXhwaXJlcyI6MTQ3OTc5MTEwNTA2NywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.zOUGv3w1P4jE58Lj5dsDvisuTeB7MmrUUoN/Av7n0VE=";

    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU=";

    $scope.smallheight =  $(window).height()*0.7;
    var CURRENT_YEAR;
  var LAST_YEAR;
  var yearMonthList = new Array();
  var monthList = new Array(12);
  var dayList = new Array();

  $scope.currentCategory = "食品类"
  $scope.tabMapData = [{
    id: "tab_CPI",
    label: "居民消费价格指数",
    name: "cpi",
    active: false
  }, {
    id: "tab_DailyPrice",
    label: "农副产品市场价格",
    name: "dailyPrice",
    active: false
  }]

  $scope.tabChangeFunction = function(tab_name) {
    switch (tab_name) {
      case $scope.tabMapData[0].name:
        initCpiTrendHighChart();
        $("#cpi_container").show();
        $("#daily_price_container").hide();
        $scope.current_tab_label = $scope.tabMapData[0].label;
        $scope.tabMapData[0].active = true;
        break
      case $scope.tabMapData[1].name:
        $scope.initFoodPriceHighChart();
        $("#cpi_container").hide();
        $("#daily_price_container").show();
        $scope.current_tab_label = $scope.tabMapData[1].label;
        $scope.tabMapData[1].active = true;
        break
    }
  }

/*******************************************************************************
                HIGHCHART CONFIGURATION AREA
*******************************************************************************/
function splineHighChart(height, categories, callFunc) {
  this.options = {
    colors: generalService.lineColors(),
    credits: {
      enabled: false
    },
    chart: {
      type: 'spline',
    },
    title: {
      text: "",
      style:{
        fontSize:'1.3em'
      }

    },
    // subtitle: {
    //   text: "————红线代表目标值"
    // },
    xAxis: {
      categories: categories,
      labels: {
        rotation: -45,
        align: 'right',
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      },
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        formatter: function() {
          return this.value
        }
      },
      plotLines: [{
        color: 'red', // 线的颜色，定义为红色
        dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
        value: 100, // 定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
        width: 2, // 标示线的宽度，2px
        label: {
                text: '参考值',
                verticalAlign: 'bottom',
                textAlign: 'right',
                y: -10,
                x: 40
            }
      }]
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>'
    },
    plotOptions: {
      spline: {
        cursor: 'pointer',
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        },
        events: {
          click: function(event) {
            var clickYear = new Number(event.point.category.slice(0, 4))
            var clickMonth = new Number(event.point.category.slice(5, 7))
            $scope.$apply(callFunc(clickYear.valueOf(), clickMonth.valueOf()))
          }
        },
      },
    },
    exporting: {
            enabled:false
}
  },
  this.series = [],
  this.size = {
    // width: 200,
    height: height
  }
}

function columnHighChart(height, categories, callFunc) {
  this.options = {
    colors: generalService.columnColors().slice(0,2),
    chart: {
      type: 'column',
    },
    title: {
      text: "",
      style:{
        fontSize:'1.3em'
      }
    },
    subtitle: {
      text: "——红线代表参考值"
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        formatter: function() {
          return this.value + ''
        }
      },
      plotLines: [{
        color: 'red', // 线的颜色，定义为红色
        dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
        value: 100.00, // 定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
        width: 2, // 标示线的宽度，2px
      }],
      min: 90

    },
    legend: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>'
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      column: {
        cursor: 'pointer',
        point: {
          events: {
            click: function(event) {
              var category = this.category
              if (category.substr(-1) != '类') {

              } else {
                if ($scope.currentCategory != category) {
                  $scope.currentCategory = category
                  $scope.$apply(callFunc(category, $scope.thisMonth))
                }
              }
            }
          }
        }
      },
      series: {
        dataLabels: {
          enabled: false,
          rotation: 270,
          format: '{y:.2f}%',
          color: '#000000',
          align: 'right',
          x: 4,
          y: -18,
          style: {
            fontSize: '14px',
            fontFamily: 'Verdana, sans-serif',
            fontWeight: 'bold'
          }
        },
      }
    },
    exporting: {
            enabled:false
}
  }
  this.series = [];
  this.size = {
    // width: 200,
    height: height
  }
}

function lineHighChart(title, xAxis, step, height) {
  this.options = {
    colors: new Array('#3333CC', '#336633', '#336666', '#336699', '#3366CC', '#339933', '#339966', '#339999', '#3399CC', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#663333', '#663366', '#663399', '#6633CC', '#666633', '#666666', '#666699', '#6666CC', '#669933', '#669966', '#669999', '#6699CC', '#66CC33', '#66CC66', '#66CC99', '#66CCCC', '#993333', '#993366', '#993399', '#9933CC', '#996633', '#996666', '#996699', '#9966CC', '#999933', '#999966', '#999999', '#9999CC', '#99CC33', '#99CC66', '#99CC99', '#99CCCC', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC6633', '#CC6666', '#CC6699', '#CC66CC', '#CC9933', '#CC9966', '#CC9999', '#CC99CC', '#CCCC33', '#CCCC66', '#CCCC99', '#CCCCCC'),
    credits: {
      enabled: false
    },
    title: {
      text: title,
      x: -20 ,//center,
      style:{
        fontSize:'1.3em'
      }
    },
    subtitle: {
      text: "",
      x: -20
    },
    xAxis: {
      categories: xAxis,
      labels: {
        step: step
      },
      tickmarkPlacement: 'on',
      title: {
        text: '天'
      },
    },
    yAxis: {
      title: {
        text: '价格（元/500克）'
      },
    },
    tooltip: {
      valueSuffix: ' 元/500克'
    },
    legend: {
      enabled: true
    },
    noData: {
      position: {
        "x": 0,
        "y": 0,
        "align": "center",
        "verticalAlign": "middle"
      },
      style: {
        "fontSize": "18px",
        "fontWeight": "bold",
        "color": "#60606a",
        "text-indent": "1em"
      }
    },
    exporting:{
       enabled:false
    }
  }
 this.series=[],
  this.size = {
    width:$(window).width(),
    height: height
  }
}

/*******************************************************************************
                      HIGHCHART FUNCTION AREA
*******************************************************************************/
  function callFunctionInCpiTrend(year, month) {
    initCpiTrendDetailHighChart(month);
    initCpiCategoryHighChart(year, month);
    callFunctionInCpiCategory("食品类", month);
  }

  function callFunctionInCpiCategory(name, month) {
    var PIArray, detailArray
    switch(name) {
      case "食品类":
        PIArray = $scope.CPIDATA.FPIList;
        detailArray = $scope.CPIDATA.FPIDetailList;
        break
      case "烟酒及用品类":
        PIArray = $scope.CPIDATA.TLPIList;
        detailArray = $scope.CPIDATA.TLPIDetailList;
        break
      case "衣着类":
        PIArray = $scope.CPIDATA.UPIList;
        detailArray = $scope.CPIDATA.UPIDetailList;
        break
      case "家庭设备用品及维修服务类":
        PIArray = $scope.CPIDATA.HAPIList;
        detailArray = $scope.CPIDATA.HAPIDetailList;
        break
      case "医疗保健和个人用品类":
        PIArray = $scope.CPIDATA.MPIList;
        detailArray = $scope.CPIDATA.MPIDetailList;
        break
      case "交通和通讯类":
        PIArray = $scope.CPIDATA.TPIList;
        detailArray = $scope.CPIDATA.TPIDetailList;
        break
      case "娱乐教育文化用品及服务类":
        PIArray = $scope.CPIDATA.EPIList;
        detailArray = $scope.CPIDATA.EPIDetailList;
        break
      case "居住类":
        PIArray = $scope.CPIDATA.RPIList;
        detailArray = $scope.CPIDATA.RPIDetailList;
        break
    }
    initCpiCategoryTrendHighChart(PIArray);
    initCpiCategoryTrendDetailHighChart(month, detailArray);
  }

  function callFunctionInCategoryTrend(year, month) {
    initCpiCategoryTrendDetailHighChart(month, $scope.CPIDATA.FPIDetailList);
  }

/*******************************************************************************
                          FUNCTION AREA
*******************************************************************************/
  function getCPIDataAll() {
    var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [LAST_YEAR, CURRENT_YEAR]),
      sort1: {
        key: 'year',
        sortType: 'asc'
      },
      sort2: {
        key: 'month',
        sortType: 'asc'
      },
      sort3: {
        key: 'cpiType',
        sortType: 'asc'
      }
    }

    var CPIDATAPOST = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: 'CPIData'
    }, {"X-Auth-Token":token},queryMap)

    CPIDATAPOST.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      var PIArray, detailArray,currentObj, detailIndex, currentCpi, accumulatedCpi, monthIndex;
      for (var i=0; i < dataList.length; i++) {
        currentObj = dataList[i];
        monthIndex = currentObj.month - 1;
        detailIndex = (currentObj.year - LAST_YEAR)*12 + monthIndex;
        currentCpi = currentObj.currentCpi;
        accumulatedCpi = currentObj.accumulatedCpi;
        if (currentObj.cpiType.name != "居民消费价格指数") {
          if (detailIndex == 0) { // 8 表示八大类消费价格指数
            $scope.CPIDATA.columnXAxis.push(currentObj.cpiName);
          }
          $scope.CPIDATA.DetailList.data[detailIndex].data[0].data.push(currentCpi);
          $scope.CPIDATA.DetailList.data[detailIndex].data[1].data.push(accumulatedCpi);
        }
        switch(currentObj.cpiType.name) {
          case "居民消费价格指数":
            PIArray = $scope.CPIDATA.CPIList;
            detailArray = $scope.CPIDATA.CPIDetailList;
            break
          case "食品类":
            PIArray = $scope.CPIDATA.FPIList;
            detailArray = $scope.CPIDATA.FPIDetailList;
            break
          case "烟酒及用品类":
            PIArray = $scope.CPIDATA.TLPIList;
            detailArray = $scope.CPIDATA.TLPIDetailList;
            break
          case "衣着类":
            PIArray = $scope.CPIDATA.UPIList;
            detailArray = $scope.CPIDATA.UPIDetailList;
            break
          case "家庭设备用品及维修服务类":
            PIArray = $scope.CPIDATA.HAPIList;
            detailArray = $scope.CPIDATA.HAPIDetailList;
            break
          case "医疗保健和个人用品类":
            PIArray = $scope.CPIDATA.MPIList;
            detailArray = $scope.CPIDATA.MPIDetailList;
            break
          case "交通和通讯类":
            PIArray = $scope.CPIDATA.TPIList;
            detailArray = $scope.CPIDATA.TPIDetailList;
            break
          case "娱乐教育文化用品及服务类":
            PIArray = $scope.CPIDATA.EPIList;
            detailArray = $scope.CPIDATA.EPIDetailList;
            break
          case "居住类":
            PIArray = $scope.CPIDATA.RPIList;
            detailArray = $scope.CPIDATA.RPIDetailList;
            break
        }
        PIArray.data[0].data.push(currentCpi);
        PIArray.data[1].data.push(accumulatedCpi);
        detailArray.data[monthIndex].data[0].data.push(currentCpi);
        detailArray.data[monthIndex].data[1].data.push(accumulatedCpi);
      }

      $scope.tabChangeFunction($scope.tabMapData[0].name);
    })
  }

  function initCpiTrendHighChart() {
    $scope.cpiHighChartOptions.cpiTrendOption.options.title.text =  LAST_YEAR + "~" + CURRENT_YEAR + "年度" + $scope.CPIDATA.CPIList.name + "趋势";
    $scope.cpiHighChartOptions.cpiTrendOption.series = $scope.CPIDATA.CPIList.data;

    callFunctionInCpiTrend($scope.thisYear, $scope.thisMonth);
  }

  function initCpiCategoryHighChart(year, month) {
    $scope.cpiDataList = $scope.CPIDATA.DetailList.data[(year - LAST_YEAR)*12 + (month - 1)].data;
    $scope.cpiHighChartOptions.categoryDetailOption.options.title.text = year + "年" + month + "月" + "居民消费价格指数同比累计比";
    $scope.cpiHighChartOptions.categoryDetailOption.series = $scope.cpiDataList;
  }

  function initCpiCategoryTrendHighChart(dataList) {
    $scope.cpiHighChartOptions.detailTrendOption.options.title.text =  LAST_YEAR + "~" + CURRENT_YEAR + "年度" + dataList.name + "居民消费价格指数趋势";
    $scope.cpiHighChartOptions.detailTrendOption.series = dataList.data;
  }

  function initCpiTrendDetailHighChart(month) {
    $scope.cpiDetailDataList = $scope.CPIDATA.CPIDetailList.data[month - 1].data;
    $scope.cpiDetailHeaderList = $scope.CPIDATA.detailColumnXAxisList[month - 1];
    $scope.cpiDetailIndexList = $scope.cpiDetailHeaderList.length === 1 ? [0] : [0,1];
    $scope.cpiHighChartOptions.cpiTrendDetailOption.options.title.text = "数据对比";
    $scope.cpiHighChartOptions.cpiTrendDetailOption.series = $scope.cpiDetailDataList;
    $scope.cpiHighChartOptions.cpiTrendDetailOption.options.xAxis.categories = $scope.cpiDetailHeaderList;
  }

  function initCpiCategoryTrendDetailHighChart(month, dataList) {
    $scope.detailTrendDataList = dataList.data[month - 1].data;
    $scope.detailTrendHeaderList = $scope.CPIDATA.detailColumnXAxisList[month - 1];
    $scope.detailTrendIndexList = $scope.detailTrendHeaderList.length === 1 ? [0] : [0,1];
    $scope.cpiHighChartOptions.detailTrendDetailOption.options.title.text = "数据对比";
    $scope.cpiHighChartOptions.detailTrendDetailOption.series = $scope.detailTrendDataList;
    $scope.cpiHighChartOptions.detailTrendDetailOption.options.xAxis.categories = $scope.detailTrendHeaderList;
}

  function getFoodPriceDataAll(year, month, day, dayList) {
    var queryMap = {
      year: generalService.advanceQueryObj('eq', 'innt', [year]),
      month: generalService.advanceQueryObj('eq', 'innt', [month]),
      sort1: {
        key: 'subsidiaryFoodName',
        sortType: 'asc'
      },
      sort2: {
        key: 'day',
        sortType: 'asc'
      }
    }

    var SUBSIDIARYFOODPRICEDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: 'SubsidiaryFoodPriceData'
    }, {"X-Auth-Token":token},queryMap);

    SUBSIDIARYFOODPRICEDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      console.log(data.data);
      var dataObject, SFArray, objectIndex, itemName, dataItem;
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i];
        switch(dataObject.subsidiaryFoodTypeName) {
          case "粮食":
            SFArray = $scope.PRICEDATA.a_riceDataList;
            break;
          case "油脂":
            SFArray = $scope.PRICEDATA.b_oilDataList;
            break;
          case "肉禽及制品":
            SFArray = $scope.PRICEDATA.c_meatDataList;
            break;
          case "蛋":
            SFArray = $scope.PRICEDATA.d_eggDataList;
            break;
          case "水产品":
            SFArray = $scope.PRICEDATA.e_aquaticProductDataList;
            break;
          case "蔬菜":
            SFArray = $scope.PRICEDATA.f_vegetableDataList;
            break;
          case "干鲜瓜果":
            SFArray = $scope.PRICEDATA.g_fruitDataList;
            break;
          case "其他":
            SFArray = $scope.PRICEDATA.h_othersDataList;
            break;
        }
        itemName = dataObject.subsidiaryFoodName;
        objectIndex = SFArray.nameList.indexOf(itemName);
        if (objectIndex === -1) {
          dataItem = new subsidiaryFoodDataObject(itemName, day);
          SFArray.nameList.push(itemName);
          SFArray.data.push(dataItem);
        } else {
          dataItem = SFArray.data[objectIndex];
        }
        dataItem.data[dayList.indexOf(pad(dataObject.day, 2))] = dataObject.price;
      }
    })
  }

  $scope.initFoodPriceHighChart = function() {
    resetPriceData();
    $scope.PRICEDATA.a_riceDataList.isCollapsed = true;
   //   $scope.PRICEDATA.a_riceDataList.Collapsed = true;
    $scope.PRICEDATA.a_riceDataList.data[0].model = true;
    $scope.foodPriceHighChartOption.series=[];
      var temseries1=[];
      temseries1.push($scope.PRICEDATA.a_riceDataList.data[0]);
      temseries=temseries1;
  }
  var temseries = [];
  $scope.checkBoxChange = function(item) {
    if (item.model) { // 选中的情况
      temseries.push(item);
  }else { // 取消选中的情况
      var index = temseries.indexOf(item);
      if (index > -1) {
        temseries.splice(index, 1);
      }
      var chart=$("#foodPriceHighChart").highcharts()
      if (chart.hasData()) {
        chart.hideNoData();
        chart.showNoData("未选中任何农副食品种类<br/>请在右侧选择您想查看的农副食品种类");
      }
    }
  }
  

  function resetPriceData(){
    var tempFoodType;
    for (tempFoodType in $scope.PRICEDATA) {
      $scope.PRICEDATA[tempFoodType].isCollapsed = false;
     //   $scope.PRICEDATA[tempFoodType].collapsed=false;
      for (var i=0; i < $scope.PRICEDATA[tempFoodType].data.length; i++) {
        $scope.PRICEDATA[tempFoodType].data[i].model = false;
      }
    }
  }


/*******************************************************************************
                              OBJECT AREA
*******************************************************************************/
  function columnDataObject(name) {
    this.data = new Array();
    this.name = name;
  }

  function splineDataObject(name, symbol) {
    this.data = new Array();
    this.name = name;
    this.marker ={symbol: symbol};
  }

  function splineListObject(name) {
    this.name = name;
    this.data = [new splineDataObject("同比", "square"), new splineDataObject("累计比", "diamond")];
  }

  function columnListObject() {
    this.data = [new columnDataObject("同比"), new columnDataObject("累计比")];
  }

  function detailListObject(num) {
    var temp = new Array();
    for (var i=0; i < 12 + num; i++) {
      temp.push(new columnListObject());
    }
    this.data = temp;
  }

  function subsidiaryFoodGroupObject(name) {
    this.name = name;
    this.nameList = new Array();
    this.data = new Array();
    this.isCollapsed = false;
     // this.Collapsed = false;
  }

  function subsidiaryFoodDataObject(name, len) {
    this.name = name;
    this.model = false;
    var arr = new Array(len);
    for (var i=0; i<len; i++) {
      arr[i] = null;
    }
    this.data = arr;
  }

/*******************************************************************************
                          UTIL FUNCTION AREA
*******************************************************************************/
  function pad(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s
  }

/*******************************************************************************
                            INIT PART
*******************************************************************************/
  qService.httpPost(dataDetailFactory.lastestObject, {
        tableName: "CPIData"
      }, {"X-Auth-Token":token},['year', 'month']).then(function(lastObjRaw){
    if (lastObjRaw.errorCode != "NO_ERROR") {
      $location.path("/main");
    }
    var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
    CURRENT_YEAR = latestObj.year;
    LAST_YEAR = CURRENT_YEAR - 1;

    $scope.thisYear = CURRENT_YEAR;
    $scope.thisMonth = latestObj.month;

    for (var i = 1; i <= 12; i++) {
      var item = LAST_YEAR + "年" + pad(i, 2) + "月";
      yearMonthList.push(item);
      monthList[i-1] = new Array();
      monthList[i-1].push(item);
    }
    for (var i = 1; i <= $scope.thisMonth; i++) {
      var item = CURRENT_YEAR + "年" + pad(i, 2) + "月";
      yearMonthList.push(item);
      monthList[i-1].push(item);
    }

    $scope.CPIDATA = {
      splineXAxis: yearMonthList,
      columnXAxis: new Array(),
      detailColumnXAxisList: monthList,
      CPIList: new splineListObject("居民消费价格指数"),
      FPIList: new splineListObject("食品类"),
      TLPIList: new splineListObject("烟酒及用品类"),
      UPIList: new splineListObject("衣着类"),
      HAPIList: new splineListObject("家庭设备用品及维修服务类"),
      MPIList: new splineListObject("医疗保健和个人用品类"),
      TPIList: new splineListObject("交通和通讯类"),
      EPIList: new splineListObject("娱乐教育文化用品及服务类"),
      RPIList: new splineListObject("居住类"),
      CPIDetailList: new detailListObject(0),
      FPIDetailList: new detailListObject(0),
      TLPIDetailList: new detailListObject(0),
      UPIDetailList: new detailListObject(0),
      HAPIDetailList: new detailListObject(0),
      MPIDetailList: new detailListObject(0),
      TPIDetailList: new detailListObject(0),
      EPIDetailList: new detailListObject(0),
      RPIDetailList: new detailListObject(0),
      DetailList: new detailListObject($scope.thisMonth)
    }

    $scope.cpiHighChartOptions = {
      cpiTrendOption: new splineHighChart($scope.smallheight, $scope.CPIDATA.splineXAxis, callFunctionInCpiTrend),
      cpiTrendDetailOption: new columnHighChart(250),
      categoryDetailOption: new columnHighChart($scope.smallheight, $scope.CPIDATA.columnXAxis, callFunctionInCpiCategory),
      detailTrendOption: new splineHighChart($scope.smallheight, $scope.CPIDATA.splineXAxis, callFunctionInCategoryTrend),
      detailTrendDetailOption: new columnHighChart(250)
    }

    getCPIDataAll();
  })


  qService.httpPost(dataDetailFactory.lastestObject, {
        tableName: "SubsidiaryFoodPriceData"
      }, {"X-Auth-Token":token},['year', 'month','day']).then(function(lastObjRaw){
    if (lastObjRaw.errorCode != "NO_ERROR") {
      $location.path("/main");
    }
    var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
    var year = latestObj.year;
    var month = latestObj.month;
    var day = latestObj.day;
 
    for (var i=1, monthDate = new Date(year, month-1, 1); i<= day; i++, monthDate.setDate(monthDate.getDate() + 1)) {
      if (monthDate.getDay()%6!=0) {
        dayList.push(pad(i, 2));
      }
    }
    console.log(dayList);
    var step = Math.floor(day / 7);
    if (step % 2 == 0) {
      step += 1;
    }
    var chartTile = year + "年" + month + "月农贸市场农副产品价格走势详情";
    $scope.foodPriceHighChartOption = new lineHighChart(chartTile, dayList, step, 450);
    $scope.PRICEDATA = {
      a_riceDataList: new subsidiaryFoodGroupObject("粮食类"),              // 粮食       2650
      b_oilDataList: new subsidiaryFoodGroupObject("油脂类"),              // 油脂       2651
      c_meatDataList: new subsidiaryFoodGroupObject("肉禽及制品类"),        // 肉禽及制品  2652
      d_eggDataList: new subsidiaryFoodGroupObject("蛋类"),                // 蛋        2653
      e_aquaticProductDataList: new subsidiaryFoodGroupObject("水产品类"), // 水产品     2654
      f_vegetableDataList: new subsidiaryFoodGroupObject("蔬菜类"),        // 蔬菜       2655
      g_fruitDataList: new subsidiaryFoodGroupObject("干鲜瓜果类"),         // 干鲜瓜果    2656
      h_othersDataList: new subsidiaryFoodGroupObject("其他"),             // 其他       2657
    }

    getFoodPriceDataAll(year, month, day, dayList);
  })

$scope.show = function(){
    $scope.show1 = !$scope.show1;
}
$scope.showtwo = function(){
    $scope.show2 = !$scope.show2;
}
$scope.showthree = function(){
    $scope.show3 = !$scope.show3;
}
$scope.showfour = function(){
    $scope.show4 = !$scope.show4;
    $scope.foodPriceHighChartOption.series = [];

}
$scope.makesure = function(){

  $scope.foodPriceHighChartOption.series = temseries;
  $scope.show4 = !$scope.show4;
}


$scope.newheight = $(window).height()*0.8;
$scope.newtop = $(window).height()*0.85;
$scope.bigheight = $(window).height()*0.88;
};
