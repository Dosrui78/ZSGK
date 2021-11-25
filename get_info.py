import requests
import json
import time
import random
from openpyxl import Workbook
wb = Workbook()
ws = wb.active
ws.append(['name', 'school_id', 'type', 'province', 'province_id', 'address', 'city', 'nature_name'])

headers = {
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'https://gkcx.eol.cn',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://gkcx.eol.cn/school/search',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}
for i in range(140, 142):
    params = (
        ('access_token', ''),
        ('admissions', ''),
        ('central', ''),
        ('department', ''),
        ('dual_class', ''),
        ('f211', ''),
        ('f985', ''),
        ('is_doublehigh', ''),
        ('is_dual_class', ''),
        ('keyword', ''),
        ('nature', ''),
        ('page', i),
        ('province_id', ''),
        ('ranktype', ''),
        ('request_type', '1'),
        ('school_type', ''),
        ('signsafe', ''),
        ('size', '20'),
        ('sort', 'view_total'),
        ('top_school_id', '/[2941,766/]'),
        ('type', ''),
        ('uri', 'apidata/api/gk/school/lists'),
)

    payloadData = {
        'access_token': '',
        'admissions': '',
        'central': '',
        'department': '',
        'dual_class': '',
        'f211': '',
        'f985': '',
        'is_doublehigh': '',
        'is_dual_class': '',
        'keyword': '',
        'nature': '',
        'page': i,
        'province_id': '',
        'ranktype': '',
        'request_type': '1',
        'school_type': '',
        'size': '20',
        'sort': 'view_total',
        'top_school_id': '[2941,766]',
        'type': '',
        'uri': 'apidata/api/gk/school/lists',
    }
    response = requests.post('https://api.eol.cn/gkcx/api/', headers=headers, params=params, data=payloadData)
    time.sleep(random.uniform(5, 7))
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.post('https://api.eol.cn/gkcx/api/?access_token=&admissions=&central=&department=&dual_class=&f211=&f985=&is_doublehigh=&is_dual_class=&keyword=&nature=&page=2&province_id=&ranktype=&request_type=1&school_type=&signsafe=&size=20&sort=view_total&top_school_id=\[2941,766\]&type=&uri=apidata/api/gk/school/lists', headers=headers, data=data)
#     print(response.json())
    data = response.json()
    for dat in data['data']['item']:
        address = dat['address']
        city = dat['city_name']
        name = dat['name']
        type = dat['type_name']
        province = dat['province_name']
        province_id = dat['province_id']
        school_id = dat['school_id']
        nature_name = dat['nature_name']
        print(name, school_id, type, province, province_id, address, city, nature_name)
        # ws.append([name, school_id, type, province, province_id, address, city, nature_name])
# wb.save('./info.xlsx')
