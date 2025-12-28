const main = (config) => {
    // --------------------------------------------------- 基础配置 ---------------------------------------------------
    config["log-level"] = "warning";
    config["mode"] = "rule";
    config["ipv6"] = true;
    config["find-process-mode"] = "strict";
    config["dns"] = {
        "enable": true,
        "listen": "127.0.0.1:1053",
        "ipv6": true,
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "default-nameserver": [
            "223.5.5.5", 
            "119.29.29.29"
        ],
        "nameserver": [
            "https://dns.alidns.com/dns-query",
            "https://doh.pub/dns-query"
        ],
        "nameserver-policy": {
            "geosite:private": ["system"] 
        },
        "fake-ip-filter": [
            "192.168.0.0/16", 
            "172.16.0.0/12", 
            "10.0.0.0/8", 
            "+.local", 
            "+.localdomain", 
            "+.localhost", 
            "+.lan", 
            "+.ntp.*.com",
            "+.stun.*",
             "Mijia Cloud",
             "+.mijia.tech"
        ]
    };
    config["tun"] = { "enable": true, "auto-route": true, "auto-redirect": true, "strict-route": true, "mtu": 9000 };
    config["sniffer"] = {
        "enable": true,
        "parse-pure-ip": true,
        "sniff": {
            "QUIC": { "ports": [443, 8443] },
            "TLS": { "ports": [443, 8443] },
            "HTTP": { "ports": [80, "8080-8880"], "override-destination": true }
        },
        "skip-domain": ["Mijia Cloud", "+.mijia.tech", "+.push.apple.com"]
    };
    config["rule-providers"] = {
        "DirectProcess": { "type": "http", "behavior": "classical", "format": "yaml", "interval": 43200, "url": "https://fastly.jsdelivr.net/gh/Ckrvxr/MihomoRules@main/Source/Addition/DirectProcess.yaml" },
        "AntiAntiFraud": { "type": "http", "behavior": "classical", "format": "yaml", "interval": 43200, "url": "https://fastly.jsdelivr.net/gh/Ckrvxr/MihomoRules@main/Source/Addition/AntiAntiFraud.yaml" },
        "AntiPCDNFix": { "type": "http", "behavior": "classical", "format": "yaml", "interval": 43200, "url": "https://fastly.jsdelivr.net/gh/Ckrvxr/MihomoRules@main/Source/Addition/AntiPCDNFix.yaml" },
        "AntiPCDN": { "type": "http", "behavior": "classical", "format": "yaml", "interval": 43200, "url": "https://fastly.jsdelivr.net/gh/Ckrvxr/MihomoRules@main/Source/Addition/AntiPCDN.yaml" },
        "AWAvenue": { "type": "http", "behavior": "domain", "format": "yaml", "interval": 43200, "url": "https://fastly.jsdelivr.net/gh/TG-Twilight/AWAvenue-Ads-Rule@main/Filters/AWAvenue-Ads-Rule-Clash.yaml" },
        "AdRules": { "type": "http", "behavior": "domain", "format": "text", "interval": 43200, "url": "https://fastly.jsdelivr.net/gh/Cats-Team/AdRules@main/adrules_domainset.txt" }
    };

    // -------------------------------------------------- 节点预处理 --------------------------------------------------
    const emojiData = [
        { match: /(Afghanistan|阿富汗|\bAF(?:\d*\s*)?)/i, emoji: "🇦🇫" },
        { match: /(Albania|阿尔巴尼亚|阿爾巴尼亞|\bAL(?:\d*\s*)?)/i, emoji: "🇦🇱" },
        { match: /(Algeria|阿尔及利亚|阿爾及利亞|\bDZ(?:\d*\s*)?)/i, emoji: "🇩🇿" },
        { match: /(Andorra|安道尔|安道爾|\bAD(?:\d*\s*)?)/i, emoji: "🇦🇩" },
        { match: /(Angola|安哥拉|\bAO(?:\d*\s*)?)/i, emoji: "🇦🇴" },
        { match: /(Antigua and Barbuda|安提瓜和巴布达|安提瓜和巴布達|\bAG(?:\d*\s*)?)/i, emoji: "🇦🇬" },
        { match: /(Argentina|阿根廷|\bAR(?:\d*\s*)?)/i, emoji: "🇦🇷" },
        { match: /(Armenia|亚美尼亚|亞美尼亞|\bAM(?:\d*\s*)?)/i, emoji: "🇦🇲" },
        { match: /(Australia|澳大利亚|澳大利亞|澳洲|Canberra|堪培拉|Sydney|悉尼|Melbourne|墨尔本|墨爾本|\bAU(?:\d*\s*)?)/i, emoji: "🇦🇺" },
        { match: /(Austria|奥地利|Vienna|维也纳|維也納|\bAT(?:\d*\s*)?)/i, emoji: "🇦🇹" },
        { match: /(Azerbaijan|阿塞拜疆|亞塞拜然|\bAZ(?:\d*\s*)?)/i, emoji: "🇦🇿" },
        { match: /(Bahamas|巴哈马|巴哈馬|\bBS(?:\d*\s*)?)/i, emoji: "🇧🇸" },
        { match: /(Bahrain|巴林|\bBH(?:\d*\s*)?)/i, emoji: "🇧🇭" },
        { match: /(Bangladesh|孟加拉国|孟加拉國|\bBD(?:\d*\s*)?)/i, emoji: "🇧🇩" },
        { match: /(Barbados|巴巴多斯|\bBB(?:\d*\s*)?)/i, emoji: "🇧🇧" },
        { match: /(Belarus|白俄罗斯|白俄羅斯|\bBY(?:\d*\s*)?)/i, emoji: "🇧🇾" },
        { match: /(Belgium|比利时|比利時|\bBE(?:\d*\s*)?)/i, emoji: "🇧🇪" },
        { match: /(Belize|伯利兹|伯利茲|\bBZ(?:\d*\s*)?)/i, emoji: "🇧🇿" },
        { match: /(Benin|贝宁|貝寧|\bBJ(?:\d*\s*)?)/i, emoji: "🇧🇯" },
        { match: /(Bhutan|不丹|\bBT(?:\d*\s*)?)/i, emoji: "🇧🇹" },
        { match: /(Bolivia|玻利维亚|玻利維亞|\bBO(?:\d*\s*)?)/i, emoji: "🇧🇴" },
        { match: /(Bosnia and Herzegovina|波斯尼亚和黑塞哥维那|波斯尼亞和黑塞哥維那|Sarajevo|萨拉热窝|薩拉熱窩|Banja Luka|巴尼亚卢卡|巴尼亞盧卡|\bBA(?:\d*\s*)?)/i, emoji: "🇧🇦" },
        { match: /(Botswana|博茨瓦纳|博茨瓦納|\bBW(?:\d*\s*)?)/i, emoji: "🇧🇼" },
        { match: /(Brazil|巴西|Brasília|巴西利亚|巴西利亞|São Paulo|圣保罗|聖保羅|Rio de Janeiro|里约热内卢|里約熱內盧|\bBR(?:\d*\s*)?)/i, emoji: "🇧🇷" },
        { match: /(Brunei|文莱|汶萊|\bBN(?:\d*\s*)?)/i, emoji: "🇧🇳" },
        { match: /(Bulgaria|保加利亚|保加利亞|\bBG(?:\d*\s*)?)/i, emoji: "🇧🇬" },
        { match: /(Burkina Faso|布基纳法索|布基納法索|\bBF(?:\d*\s*)?)/i, emoji: "🇧🇫" },
        { match: /(Burundi|布隆迪|\bBI(?:\d*\s*)?)/i, emoji: "🇧🇮" },
        { match: /(Cabo Verde|Cape Verde|佛得角|\bCV(?:\d*\s*)?)/i, emoji: "🇨🇻" },
        { match: /(Cambodia|柬埔寨|Phnom Penh|金边|金邊|\bKH(?:\d*\s*)?)/i, emoji: "🇰🇭" },
        { match: /(Cameroon|喀麦隆|喀麥隆|\bCM(?:\d*\s*)?)/i, emoji: "🇨🇲" },
        { match: /(Canada|加拿大|Ottawa|渥太华|渥太華|Toronto|多伦多|多倫多|Vancouver|温哥华|溫哥華|Montreal|蒙特利尔|蒙特利爾|Edmonton|埃德蒙顿|埃德蒙頓|Winnipeg|温尼伯|溫尼伯|\bCA(?:\d*\s*)?)/i, emoji: "🇨🇦" },
        { match: /(Central African Republic|中非|\bCF(?:\d*\s*)?)/i, emoji: "🇨🇫" },
        { match: /(Chad|乍得|\bTD(?:\d*\s*)?)/i, emoji: "🇹🇩" },
        { match: /(Chile|智利|\bCL(?:\d*\s*)?)/i, emoji: "🇨🇱" },
        { match: /(China|中国|中國|中华人民共和国|中華人民共和國|Beijing|北京|Tianjin|天津|Shanghai|上海|Guangzhou|广州|廣州|Shenzhen|深圳|Hangzhou|杭州|Suzhou|苏州|Nanjing|南京|\bCN(?:\d*\s*)?)/i, emoji: "🇨🇳" },
        { match: /(Colombia|哥伦比亚|哥倫比亞|\bCO(?:\d*\s*)?)/i, emoji: "🇨🇴" },
        { match: /(Comoros|科摩罗|科摩羅|\bKM(?:\d*\s*)?)/i, emoji: "🇰🇲" },
        { match: /(Congo, Democratic Republic of the|刚果民主共和国|剛果民主共和國|\bCD(?:\d*\s*)?)/i, emoji: "🇨🇩" },
        { match: /(Congo, Republic of the|刚果共和国|剛果共和國|\bCG(?:\d*\s*)?)/i, emoji: "🇨🇬" },
        { match: /(Costa Rica|哥斯达黎加|哥斯大黎加|\bCR(?:\d*\s*)?)/i, emoji: "🇨🇷" },
        { match: /(Croatia|克罗地亚|克羅地亞|\bHR(?:\d*\s*)?)/i, emoji: "🇭🇷" },
        { match: /(Cuba|古巴|Havana|哈瓦那|\bCU(?:\d*\s*)?)/i, emoji: "🇨🇺" },
        { match: /(Cyprus|塞浦路斯|\bCY(?:\d*\s*)?)/i, emoji: "🇨🇾" },
        { match: /(Czech Republic|捷克|\bCZ(?:\d*\s*)?)/i, emoji: "🇨🇿" },
        { match: /(Denmark|丹麦|丹麥|\bDK(?:\d*\s*)?)/i, emoji: "🇩🇰" },
        { match: /(Djibouti|吉布提|\bDJ(?:\d*\s*)?)/i, emoji: "🇩🇯" },
        { match: /(Dominica|多米尼克|\bDM(?:\d*\s*)?)/i, emoji: "🇩🇲" },
        { match: /(Dominican Republic|多米尼加|多明尼加|\bDO(?:\d*\s*)?)/i, emoji: "🇩🇴" },
        { match: /(Ecuador|厄瓜多尔|厄瓜多爾|\bEC(?:\d*\s*)?)/i, emoji: "🇪🇨" },
        { match: /(Egypt|埃及|阿拉伯埃及共和國|阿拉伯埃及共和国|Cairo|开罗|開羅|\bEG(?:\d*\s*)?)/i, emoji: "🇪🇬" },
        { match: /(El Salvador|萨尔瓦多|薩爾瓦多|\bSV(?:\d*\s*)?)/i, emoji: "🇸🇻" },
        { match: /(Equatorial Guinea|赤道几内亚|赤道幾內亞|\bGQ(?:\d*\s*)?)/i, emoji: "🇬🇶" },
        { match: /(Eritrea|厄立特里亚|厄立特里亞|\bER(?:\d*\s*)?)/i, emoji: "🇪🇷" },
        { match: /(Estonia|爱沙尼亚|愛沙尼亞|\bEE(?:\d*\s*)?)/i, emoji: "🇪🇪" },
        { match: /(Eswatini|斯威士兰|斯威士蘭|\bSZ(?:\d*\s*)?)/i, emoji: "🇸🇿" },
        { match: /(Ethiopia|埃塞俄比亚|埃塞俄比亞|\bET(?:\d*\s*)?)/i, emoji: "🇪🇹" },
        { match: /(Fiji|斐济|斐濟|\bFJ(?:\d*\s*)?)/i, emoji: "🇫🇯" },
        { match: /(Finland|芬兰|芬蘭|\bFI(?:\d*\s*)?)/i, emoji: "🇫🇮" },
        { match: /(France|法国|法國|法兰西|法蘭西|Paris|巴黎|Marseille|马赛|馬賽|\bFR(?:\d*\s*)?)/i, emoji: "🇫🇷" },
        { match: /(Gabon|加蓬|\bGA(?:\d*\s*)?)/i, emoji: "🇬🇦" },
        { match: /(Gambia|冈比亚|岡比亞|\bGM(?:\d*\s*)?)/i, emoji: "🇬🇲" },
        { match: /(Georgia|格鲁吉亚|格魯吉亞|\bGE(?!(mini))\d*\b)/i, emoji: "🇬🇪" }
        { match: /(Germany|德国|德國|德意志|Berlin|柏林|Hamburg|汉堡|漢堡|Munich|慕尼黑|\bDE(?:\d*\s*)?)/i, emoji: "🇩🇪" },
        { match: /(Ghana|加纳|加納|\bGH(?:\d*\s*)?)/i, emoji: "🇬🇭" },
        { match: /(Greece|希腊|希臘|Athens|雅典|\bGR(?:\d*\s*)?)/i, emoji: "🇬🇷" },
        { match: /(Grenada|格林纳达|格林納達|\bGD(?:\d*\s*)?)/i, emoji: "🇬🇩" },
        { match: /(Guatemala|危地马拉|危地馬拉|\bGT(?:\d*\s*)?)/i, emoji: "🇬🇹" },
        { match: /(Guinea|几内亚|幾內亞|\bGN(?:\d*\s*)?)/i, emoji: "🇬🇳" },
        { match: /(Guinea-Bissau|几内亚比绍|幾內亞比紹|\bGW(?:\d*\s*)?)/i, emoji: "🇬🇼" },
        { match: /(Guyana|圭亚那|圭亞那|\bGY(?:\d*\s*)?)/i, emoji: "🇬🇾" },
        { match: /(Haiti|海地|\bHT(?:\d*\s*)?)/i, emoji: "🇭🇹" },
        { match: /(Honduras|洪都拉斯|宏都拉斯|\bHN(?:\d*\s*)?)/i, emoji: "🇭🇳" },
        { match: /(Hong Kong|香港|\bHK(?:\d*\s*)?)/i, emoji: "🇭🇰" },
        { match: /(Hungary|匈牙利|\bHU(?:\d*\s*)?)/i, emoji: "🇭🇺" },
        { match: /(Iceland|冰岛|\bIS(?:\d*\s*)?)/i, emoji: "🇮🇸" },
        { match: /(India|印度|New Delhi|新德里|Mumbai|孟买|孟買|Bangalore|班加罗尔|班加羅爾|\bIN(?:\d*\s*)?)/i, emoji: "🇮🇳" },
        { match: /(Indonesia|印度尼西亚|印度尼西亞|印尼|Jakarta|雅加达|雅加達|Bandung|万隆|萬隆|\bID(?:\d*\s*)?)/i, emoji: "🇮🇩" },
        { match: /(Iran|伊朗|\bIR(?:\d*\s*)?)/i, emoji: "🇮🇷" },
        { match: /(Iraq|伊拉克|\bIQ(?:\d*\s*)?)/i, emoji: "🇮🇶" },
        { match: /(Ireland|爱尔兰|愛爾蘭|Dublin|都柏林|Cork|科克|\bIE\s*\d+)/i, emoji: "🇮🇪" },
        { match: /(Israel|以色列|Jerusalem|耶路撒冷|\bIL(?:\d*\s*)?)/i, emoji: "🇮🇱" },
        { match: /(Italy|意大利|Rome|罗马|羅馬|Milan|米兰|米蘭|\bIT(?:\d*\s*)?)/i, emoji: "🇮🇹" },
        { match: /(Ivory Coast|象牙海岸|科特迪瓦|\bCI(?:\d*\s*)?)/i, emoji: "🇨🇮" },
        { match: /(Jamaica|牙买加|牙買加|\bJM(?:\d*\s*)?)/i, emoji: "🇯🇲" },
        { match: /(Japan|日本|日(?!尔|爾|利)|Tokyo|东京|東京|Osaka|大阪|Kyoto|京都|Saitama|埼玉|\bJP(?:\d*\s*)?)/i, emoji: "🇯🇵" },
        { match: /(Jordan|约旦|約旦|\bJO(?:\d*\s*)?)/i, emoji: "🇯🇴" },
        { match: /(Kazakhstan|哈萨克斯坦|哈薩克斯坦|\bKZ(?:\d*\s*)?)/i, emoji: "🇰🇿" },
        { match: /(Kenya|肯尼亚|肯尼亞|\bKE(?:\d*\s*)?)/i, emoji: "🇰🇪" },
        { match: /(Kiribati|基里巴斯|\bKI(?:\d*\s*)?)/i, emoji: "🇰🇮" },
        { match: /(Kuwait|科威特|\bKW(?:\d*\s*)?)/i, emoji: "🇰🇼" },
        { match: /(Kyrgyzstan|吉尔吉斯斯坦|吉爾吉斯斯坦|\bKG(?:\d*\s*)?)/i, emoji: "🇰🇬" },
        { match: /(Laos|老挝|老撾|Vientiane|万象|萬象)/i, emoji: "🇱🇦" },
        { match: /(Latvia|拉脱维亚|拉脫維亞|\bLV(?:\d*\s*)?)/i, emoji: "🇱🇻" },
        { match: /(Lebanon|黎巴嫩|\bLB(?:\d*\s*)?)/i, emoji: "🇱🇧" },
        { match: /(Lesotho|莱索托|\bLS(?:\d*\s*)?)/i, emoji: "🇱🇸" },
        { match: /(Liberia|利比里亚|利比里亞|\bLR(?:\d*\s*)?)/i, emoji: "🇱🇷" },
        { match: /(Libya|利比亚|利比亞|\bLY(?:\d*\s*)?)/i, emoji: "🇱🇾" },
        { match: /(Liechtenstein|列支敦士登|列支敦斯登|\bLI(?:\d*\s*)?)/i, emoji: "🇱🇮" },
        { match: /(Lithuania|立陶宛|\bLT(?:\d*\s*)?)/i, emoji: "🇱🇹" },
        { match: /(Luxembourg|卢森堡|盧森堡|\bLU(?:\d*\s*)?)/i, emoji: "🇱🇺" },
        { match: /(Macao|Macau|澳门|澳門|\bMO(?:\d*\s*)?)/i, emoji: "🇲🇴" },
        { match: /(Madagascar|马达加斯加|馬達加斯加|\bMG(?:\d*\s*)?)/i, emoji: "🇲🇬" },
        { match: /(Malawi|马拉维|馬拉維|\bMW(?:\d*\s*)?)/i, emoji: "🇲🇼" },
        { match: /(Malaysia|马来西亚|馬來西亞|Kuala Lumpur|吉隆坡|Penang|槟城|檳城|\bMY(?:\d*\s*)?)/i, emoji: "🇲🇾" },
        { match: /(Maldives|马尔代夫|馬爾代夫|\bMV(?:\d*\s*)?)/i, emoji: "🇲🇻" },
        { match: /(Mali|马里|馬里|\bML(?:\d*\s*)?)/i, emoji: "🇲🇱" },
        { match: /(Malta|马耳他|馬耳他|\bMT(?:\d*\s*)?)/i, emoji: "🇲🇹" },
        { match: /(Marshall Islands|马绍尔群岛|馬紹爾群島|\bMH(?:\d*\s*)?)/i, emoji: "🇲🇭" },
        { match: /(Martinique|马提尼克|\bMQ(?:\d*\s*)?)/i, emoji: "🇲🇶" },
        { match: /(Mauritania|毛里塔尼亚|毛里塔尼亞|\bMR(?:\d*\s*)?)/i, emoji: "🇲🇷" },
        { match: /(Mauritius|毛里求斯|毛里裘斯|\bMU(?:\d*\s*)?)/i, emoji: "🇲🇺" },
        { match: /(Mexico|墨西哥|墨|\bMX(?:\d*\s*)?)/i, emoji: "🇲🇽" },
        { match: /(Micronesia|密克罗尼西亚|密克羅尼西亞|\bFM(?:\d*\s*)?)/i, emoji: "🇫🇲" },
        { match: /(Moldova|摩尔多瓦|摩爾多瓦|\bMD(?:\d*\s*)?)/i, emoji: "🇲🇩" },
        { match: /(Monaco|摩纳哥|摩納哥|\bMC(?:\d*\s*)?)/i, emoji: "🇲🇨" },
        { match: /(Mongolia|蒙古|\bMN(?:\d*\s*)?)/i, emoji: "🇲🇳" },
        { match: /(Montenegro|黑山|\bME(?:\d*\s*)?)/i, emoji: "🇲🇪" },
        { match: /(Morocco|摩洛哥|\bMA(?:\d*\s*)?)/i, emoji: "🇲🇦" },
        { match: /(Mozambique|莫桑比克|\bMZ(?:\d*\s*)?)/i, emoji: "🇲🇿" },
        { match: /(Myanmar|缅甸|緬甸|Naypyidaw|内比都|內比都|Yangon|仰光|\bMM(?:\d*\s*)?)/i, emoji: "🇲🇲" },
        { match: /(Namibia|纳米比亚|納米比亞|\bNA(?:\d*\s*)?)/i, emoji: "🇳🇦" },
        { match: /(Nauru|瑙鲁|瑙魯|\bNR(?:\d*\s*)?)/i, emoji: "🇳🇷" },
        { match: /(Nepal|尼泊尔|尼泊爾|\bNP(?:\d*\s*)?)/i, emoji: "🇳🇵" },
        { match: /(Netherlands|荷兰|荷蘭|\bNL(?:\d*\s*)?)/i, emoji: "🇳🇱" },
        { match: /(New Caledonia|新喀里多尼亚|\bNC(?:\d*\s*)?)/i, emoji: "🇳🇨" },
        { match: /(New Zealand|新西兰|新西蘭|\bNZ(?:\d*\s*)?)/i, emoji: "🇳🇿" },
        { match: /(Nicaragua|尼加拉瓜|\bNI(?:\d*\s*)?)/i, emoji: "🇳🇮" },
        { match: /(Niger|尼日尔|尼日爾|\bNE(?:\d*\s*)?)/i, emoji: "🇳🇪" },
        { match: /(Nigeria|尼日利亚|尼日利亞|\bNG(?:\d*\s*)?)/i, emoji: "🇳🇬" },
        { match: /(North Korea|朝鲜|朝鮮|Pyongyang|平壤|\bKP(?:\d*\s*)?)/i, emoji: "🇰🇵" },
        { match: /(North Macedonia|北马其顿|北馬其頓|\bMK(?:\d*\s*)?)/i, emoji: "🇲🇰" },
        { match: /(Norway|挪威|\bNO(?:\d*\s*)?)/i, emoji: "🇳🇴" },
        { match: /(Oman|阿曼|\bOM(?:\d*\s*)?)/i, emoji: "🇴🇲" },
        { match: /(Pakistan|巴基斯坦|\bPK(?:\d*\s*)?)/i, emoji: "🇵🇰" },
        { match: /(Palau|帕劳|帛琉|\bPW(?:\d*\s*)?)/i, emoji: "🇵🇼" },
        { match: /(Palestine|巴勒斯坦|Gaza|加沙|\bPS(?:\d*\s*)?)/i, emoji: "🇵🇸" },
        { match: /(Panama|巴拿马|巴拿馬|\bPA(?:\d*\s*)?)/i, emoji: "🇵🇦" },
        { match: /(Papua New Guinea|巴布亚新几内亚|巴布亞新畿內亞|\bPG(?:\d*\s*)?)/i, emoji: "🇵🇬" },
        { match: /(Paraguay|巴拉圭|\bPY(?:\d*\s*)?)/i, emoji: "🇵🇾" },
        { match: /(Peru|秘鲁|秘魯|\bPE(?:\d*\s*)?)/i, emoji: "🇵🇪" },
        { match: /(Philippines|菲律宾|菲律賓|Manila|马尼拉|馬尼拉|Davao|达沃|達沃|\bPH(?:\d*\s*)?)/i, emoji: "🇵🇭" },
        { match: /(Poland|波兰|波蘭|Warsaw|华沙|華沙|\bPL(?:\d*\s*)?)/i, emoji: "🇵🇱" },
        { match: /(Portugal|葡萄牙|\bPT(?:\d*\s*)?)/i, emoji: "🇵🇹" },
        { match: /(Qatar|卡塔尔|卡塔爾|\bQA(?:\d*\s*)?)/i, emoji: "🇶🇦" },
        { match: /(Romania|罗马尼亚|羅馬尼亞|\bRO(?:\d*\s*)?)/i, emoji: "🇷🇴" },
        { match: /(Russia|俄罗斯|俄羅斯|Moscow|莫斯科|Saint Petersburg|圣彼得堡|聖彼得堡|\bRU(?:\d*\s*)?)/i, emoji: "🇷🇺" },
        { match: /(Rwanda|卢旺达|盧旺達|\bRW(?:\d*\s*)?)/i, emoji: "🇷🇼" },
        { match: /(Saudi Arabia|沙特|\bSA(?:\d*\s*)?)/i, emoji: "🇸🇦" },
        { match: /(Senegal|塞内加尔|塞內加爾|\bSN(?:\d*\s*)?)/i, emoji: "🇸🇳" },
        { match: /(Serbia|塞尔维亚|塞爾維亞|\bRS(?:\d*\s*)?)/i, emoji: "🇷🇸" },
        { match: /(Seychelles|塞舌尔|塞席爾|\bSC(?:\d*\s*)?)/i, emoji: "🇸🇨" },
        { match: /(Sierra Leone|塞拉利昂|\bSL(?:\d*\s*)?)/i, emoji: "🇸🇱" },
        { match: /(Singapore|新加坡|\bSG(?:\d*\s*)?)/i, emoji: "🇸🇬" },
        { match: /(Slovakia|斯洛伐克|\bSK(?:\d*\s*)?)/i, emoji: "🇸🇰" },
        { match: /(Slovenia|斯洛文尼亚|斯洛維尼亞|\bSI(?:\d*\s*)?)/i, emoji: "🇸🇮" },
        { match: /(Solomon Islands|所罗门群岛|所羅門群島|\bSB(?:\d*\s*)?)/i, emoji: "🇸🇧" },
        { match: /(Somalia|索马里|索馬里|\bSO(?:\d*\s*)?)/i, emoji: "🇸🇴" },
        { match: /(South Africa|南非|Johannesburg|约翰内斯堡|約翰內斯堡|约堡|\bZA(?:\d*\s*)?)/i, emoji: "🇿🇦" },
        { match: /(South Korea|Korea|韩国|韓國|韩|韓|Seoul|首尔|首爾|Busan|釜山|Daegu|大邱|\bKR(?:\d*\s*)?)/i, emoji: "🇰🇷" },
        { match: /(South Sudan|南苏丹|南蘇丹|\bSS(?:\d*\s*)?)/i, emoji: "🇸🇸" },
        { match: /(Spain|西班牙|Madrid|马德里|馬德里|Barcelona|巴塞罗那|巴塞羅那|\bES(?:\d*\s*)?)/i, emoji: "🇪🇸" },
        { match: /(Sri Lanka|斯里兰卡|斯里蘭卡|\bLK(?:\d*\s*)?)/i, emoji: "🇱🇰" },
        { match: /(Sudan|苏丹|蘇丹|\bSD(?:\d*\s*)?)/i, emoji: "🇸🇩" },
        { match: /(Suriname|苏里南|蘇里南|\bSR(?:\d*\s*)?)/i, emoji: "🇸🇷" },
        { match: /(Sweden|瑞典|Stockholm|斯德哥尔摩|斯德哥爾摩|Gothenburg|哥德堡|\bSE(?:\d*\s*)?)/i, emoji: "🇸🇪" },
        { match: /(Switzerland|瑞士|Zurich|苏黎世|蘇黎世|\bCH(?:\d*\s*)?)/i, emoji: "🇨🇭" },
        { match: /(Syria|叙利亚|敘利亞|\bSY(?:\d*\s*)?)/i, emoji: "🇸🇾" },
        { match: /(Taiwan|台湾|台灣|臺灣|Taipei|台北|臺北|Tainan|台南|臺南|Taichung|台中|Kaohsiung|高雄|Hsinchu|新竹|Keelung|基隆|Chiayi|嘉义|嘉義|\bTW(?:\d*\s*)?)/i, emoji: "🇹🇼" },
        { match: /(Tajikistan|塔吉克斯坦|\bTJ(?:\d*\s*)?)/i, emoji: "🇹🇯" },
        { match: /(Tanzania|坦桑尼亚|坦桑尼亞|\bTZ(?:\d*\s*)?)/i, emoji: "🇹🇿" },
        { match: /(Thailand|泰国|泰國|Bangkok|曼谷|Chiang Mai|清迈|清邁|\bTH(?:\d*\s*)?)/i, emoji: "🇹🇭" },
        { match: /(Timor-Leste|东帝汶|東帝汶|\bTL(?:\d*\s*)?)/i, emoji: "🇹🇱" },
        { match: /(Togo|多哥|\bTG(?:\d*\s*)?)/i, emoji: "🇹🇬" },
        { match: /(Tonga|汤加|湯加|\bTO(?:\d*\s*)?)/i, emoji: "🇹🇴" },
        { match: /(Trinidad and Tobago|特立尼达和多巴哥|特立尼達和多巴哥|\bTT(?:\d*\s*)?)/i, emoji: "🇹🇹" },
        { match: /(Tunisia|突尼斯|\bTN(?:\d*\s*)?)/i, emoji: "🇹🇳" },
        { match: /(Turkey|土耳其|Ankara|安卡拉|\bTR(?:\d*\s*)?)/i, emoji: "🇹🇷" },
        { match: /(Turkmenistan|土库曼斯坦|土庫曼斯坦|\bTM(?:\d*\s*)?)/i, emoji: "🇹🇲" },
        { match: /(Tuvalu|图瓦卢|圖瓦盧|\bTV(?:\d*\s*)?)/i, emoji: "🇹🇻" },
        { match: /(Uganda|乌干达|烏干達|\bUG(?:\d*\s*)?)/i, emoji: "🇺🇬" },
        { match: /(Ukraine|乌克兰|烏克蘭|Kyiv|基辅|基輔|\bUA(?:\d*\s*)?)/i, emoji: "🇺🇦" },
        { match: /(United Arab Emirates|阿联酋|阿拉伯联合酋长国|阿拉伯聯合酋長國|Dubai|迪拜|\bAE(?:\d*\s*)?)/i, emoji: "🇦🇪" },
        { match: /(United Kingdom|英国|英國|英格兰|英格蘭|大不列颠|大不列顛|London|伦敦|倫敦|Manchester|曼彻斯特|曼徹斯特|Birmingham|伯明翰|\bGB(?:\d*\s*)?)/i, emoji: "🇬🇧" },
        { match: /(United States|USA|美国|美國|美(?!尼)|米国|米國|Washington|华盛顿|華盛頓|New York|纽约|紐約|Los Angeles|洛杉矶|洛杉磯|Chicago|芝加哥|Houston|休斯顿|休斯頓|Phoenix|凤凰城|鳳凰城|Philadelphia|费城|費城|San Antonio|圣安东尼奥|聖安東尼奧|San Diego|圣迭戈|聖迭戈|Dallas|达拉斯|達拉斯|San Jose|圣何塞|聖何塞|Austin|奥斯汀|奧斯汀|\bUS(?:\d*\s*)?)/i, emoji: "🇺🇸" },
        { match: /(Uruguay|乌拉圭|烏拉圭|\bUY(?:\d*\s*)?)/i, emoji: "🇺🇾" },
        { match: /(Uzbekistan|乌兹别克斯坦|烏茲別克斯坦|\bUZ(?:\d*\s*)?)/i, emoji: "🇺🇿" },
        { match: /(Vatican City|梵蒂冈|梵蒂岡|\bVA(?:\d*\s*)?)/i, emoji: "🇻🇦" },
        { match: /(Venezuela|委内瑞拉|委內瑞拉|\bVE(?:\d*\s*)?)/i, emoji: "🇻🇪" },
        { match: /(Vietnam|越南|Hanoi|河内|河內|Ho Chi Minh|胡志明|\bVN(?:\d*\s*)?)/i, emoji: "🇻🇳" },
        { match: /(Yemen|也门|也門|\bYE(?:\d*\s*)?)/i, emoji: "🇾🇪" },
        { match: /(Zambia|赞比亚|贊比亞|\bZM(?:\d*\s*)?)/i, emoji: "🇿🇲" },
        { match: /(Zimbabwe|津巴布韦|津巴布韋|\bZW(?:\d*\s*)?)/i, emoji: "🇿🇼" }
    ];
    const emojiRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/u;
    const processNameWithEmoji = (name) => {
        let newName = name;
        for (let item of emojiData) {
            if (item.match.test(newName)) {
                // 如果已有 Emoji，替换它；如果没有，则在开头添加
                if (emojiRegex.test(newName)) {
                    newName = newName.replace(emojiRegex, item.emoji);
                } else {
                    newName = `${item.emoji} ${newName}`;
                }
                break;
            }
        }
        return newName;
    };
    if (config.proxies) {
        config.proxies.forEach(p => {
            p.name = processNameWithEmoji(p.name);
        });
    }
    const excludeRegex = /(Official|官网|Data Left|Remain|剩余|流量|Expire|过期|时间|Reset|重置|GB|MB)/i;
    const allProxies = config.proxies.map(p => p.name);
    const filteredProxies = allProxies.filter(name => !excludeRegex.test(name));

    // --------------------------------------------------- 规则生成 ---------------------------------------------------
    config["proxy-groups"] = [
        {
            name: "🚀 PROXY",
            type: "select",
            proxies: ["⚡ AUTO", ...filteredProxies]
        },
        {
            name: "🏠 PCDN",
            type: "select",
            proxies: ["REJECT", "PASS"]
        },
        {
            name: "🔰 AD & Privacy",
            type: "select",
            proxies: ["REJECT", "PASS"]
        },
        {
            name: "⚡ AUTO",
            type: "url-test",
            url: "http://www.gstatic.com/generate_204",
            interval: 600,
            hidden: true,
            proxies: filteredProxies
        }
    ];
    config.rules = [
        "RULE-SET,DirectProcess,DIRECT",
        "RULE-SET,AntiAntiFraud,REJECT",
        "RULE-SET,AntiPCDNFix,DIRECT",
        "RULE-SET,AntiPCDN,🏠 PCDN",
        "RULE-SET,AWAvenue,🔰 AD & Privacy",
        "RULE-SET,AdRules,🔰 AD & Privacy",
        "GEOSITE,category-games@cn,DIRECT",
        "GEOSITE,google,🚀 PROXY",
        "GEOSITE,microsoft,🚀 PROXY",
        "GEOSITE,apple,🚀 PROXY",
        "GEOSITE,private,DIRECT",
        "GEOSITE,cn,DIRECT",
        "GEOSITE,!cn,🚀 PROXY",
        "GEOIP,private,DIRECT",
        "GEOIP,cn,DIRECT",
        "GEOIP,!cn,🚀 PROXY",
        "MATCH,🚀 PROXY"
    ];

    return config;
};
