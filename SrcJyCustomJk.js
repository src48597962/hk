let customparse = {
    csp_custom_aicb: function (name) {
        let list = [];
        eval(getCryptoJS());
        let token = CryptoJS.SHA1(name + "URBBRGROUN").toString();
        try {
            let html = request('https://api.cupfox.app/api/v2/search/?text=' + name + '&type=0&from=0&size=200&token=' + token);
            var lists = JSON.parse(html).resources;
        } catch (e) {
            var lists = [];
        }
        lists.forEach(item => {
            let vodname = item.text.replace(/<em>|<\/em>/g, ''); 
            if (!/qq|mgtv|iptv|iqiyi|youku|bilibili|souhu|cctv|wybg666|bdys01|ylwt33/.test(item.url)&&vodname.indexOf(name)>-1) {
                list.push({
                    vodname: vodname,
                    vodpic: "",
                    voddesc: item.website + (item.tags.length > 0 ? '  [' + item.tags.join(' ') + ']' : ''),
                    vodurl: item.url
                })
            }
        });
        return list;
    },
    csp_custom_aidog: function (name) {
        try {
            var lists = [];
            let html = request("https://www.dianyinggou.com/so/" + name);
            let data = pdfa(html, "body&&.movies&&.each");
            let cook = getCookie('https://www.dianyinggou.com');
            data.forEach(item=>{
                let dogname = pdfh(item, "a&&title");
                if(dogname == name){
                    let dogurl = pdfh(item, "a&&href");
                    let dogpic = pdfh(item, "img&&data-url");
                    let headers = {
                        "User-Agent": MOBILE_UA,
                        "Referer": dogurl,
                        "x-requested-with": "XMLHttpRequest",
                        "Cookie": cook
                    };
                    let doghtml = request('https://www.dianyinggou.com/SpiderMovie/zy/' + dogname, {headers: headers});
                    let htmls = pdfa(doghtml, "body&&a");
                    htmls.forEach(it=>{
                        try{
                            let sitename = pdfh(it, "a&&li,1&&Text");
                            let vodname = pdfh(it, "a&&li,0&&Text");
                            let vodurl = pdfh(it, "a&&href");
                            if(vodname==dogname&&!lists.some(ii => ii.url==vodurl)){
                                lists.push({name:vodname,pic:dogpic,url:vodurl,site:sitename})
                            }
                        }catch(e){}
                    })
                }
            })
        } catch (e) {
            log(e.message);
            var lists = [];
        }

        let list = [];
        let task = function(obj) {
            try{
                let trueurl = request(obj.url, {redirect: false, withHeaders: true});
                let vodurl = JSON.parse(trueurl).headers.location[0];
                if(!/qq|mgtv|iptv|iqiyi|youku|bilibili|souhu|cctv|icaqd|cokemv|mhyyy|fun4k|jpys\.me|31kan|37dyw|kpkuang/.test(vodurl)&&!list.some(ii => ii.vodurl==vodurl)){
                    list.push({
                        vodname: obj.name,
                        vodpic: obj.pic.replace(/http.*?\?url=/,''),
                        voddesc: obj.site,
                        vodurl: vodurl
                    })
                }
            }catch(e){}
            return 1;
        }
        let doglist = lists.map((item)=>{
			return {
				func: task,
				param: item,
				id: item.url
			}
        });
        if(doglist.length>0){
            be(doglist, {
                func: function(obj, id, error, taskResult) {
                },
                param: {
                }
            });
        }
        return list;
    },
    csp_custom_aiwandou: function (name) {
        try {
            var lists = [];
            let html = request("https://wuli.api.bailian168.cc/movie/getsearchlist/keywords/"+name+"/page/1/rows/20.json");
            let data = JSON.parse(html).data;
            data.forEach(item=>{
                let ainame = item.movie_name;
                if(ainame == name){
                    let aiurl = "https://www.wandou.pro/_next/data/7cd38774e4afd0127c31c9ea7e3835dd76514e15/detail/"+item.movie_id+".json?id="+item.movie_id;
                    let aipic = item.movie_img_url;
                    let aihtml = request(aiurl);
                    let htmls = JSON.parse(aihtml).pageProps.data.playData;
                    let vodname = JSON.parse(aihtml).pageProps.data.movie.movie_name;
                    htmls.forEach(it=>{
                        try{
                            let sitename = it.site_name;
                            let vodurl = it.data_url;
                            if(!lists.some(ii => ii.url==vodurl)){
                                lists.push({name:vodname,pic:aipic,url:vodurl,site:sitename});
                            }
                        }catch(e){}
                    })
                }
            })
        } catch (e) {
            log(e.message);
            var lists = [];
        }

        let list = [];
        lists.forEach(item=>{
            if(!/qq|mgtv|iptv|iqiyi|youku|bilibili|souhu|cctv|icaqd|cokemv|mhyyy|fun4k|jpys\.me|31kan|37dyw|kpkuang/.test(item.url)&&!list.some(ii => ii.vodurl==item.url)){
                list.push({
                    vodname: item.name,
                    vodpic: item.pic.replace(/http.*?\?url=/,''),
                    voddesc: item.site,
                    vodurl: item.url
                })
            }
        })
        return list;
    }
}
