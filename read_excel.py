import xlrd
wb = xlrd.open_workbook('./info.xlsx')
sheet = wb.sheets()[0]
def get_school_id():
    rows = sheet.nrows
    for i in range(rows):
        # print(int(sheet.row(i)[1].value))
        code_list = int(sheet.row(i)[1].value)
        yield code_list

def get_province_id():
    pro_list = []
    rows = sheet.nrows
    for i in range(rows):
        pro_list.append(int(sheet.row(i)[4].value))
    for j in set(pro_list):
        yield j

