from django.db import connection
from .utils import fetch_to_list

"""
    Class that accesses the Database through ORM queries, 
    We create queries by calling the functions of the database 
    that were performed.
"""


class DB:
    def __init__(self):
        self.db = 'mycash'

    # The sum of the income per day in the last days
    @staticmethod
    def income_month(idu, month):
        with connection.cursor() as cursor:
            cursor.execute("select * from income_month(%s,%s)", [idu, month])

            incomes = cursor.fetchall()
            return fetch_to_list(incomes)

    # The sum of the expense per day in the last days
    @staticmethod
    def expense_day(idu, day):
        with connection.cursor() as cursor:
            cursor.execute("select * from expense_day(%s,%s)", [idu, day])

            expenses = cursor.fetchall()
            return fetch_to_list(expenses)

    @staticmethod
    def delete_account(id_us):
        with connection.cursor() as cursor:
            cursor.execute("select * from delete_account(%s)", [id_us])

    @staticmethod
    def savings_per_user(id_us):
        with connection.cursor() as cursor:
            cursor.execute("select * from savings_per_user(%s)", [id_us])
            return cursor.fetchall()[0][0]

    # The sum of the income per day in the last days
    @staticmethod
    def income_all_month(idu):
        with connection.cursor() as cursor:
            cursor.execute("select * from income_all_month(%s)", [idu])

            incomes = cursor.fetchall()
            return fetch_to_list(incomes)

    @staticmethod
    def expense_all_day(idu):
        with connection.cursor() as cursor:
            cursor.execute("select * from expense_all_day(%s)", [idu])

            expenses = cursor.fetchall()
            return fetch_to_list(expenses)

    @staticmethod
    def expense_income_historical(idu):
        with connection.cursor() as cursor:

            cursor.execute("select * from income_all_month(%s)", [idu])
            incomes = cursor.fetchall()
            tdi = fetch_to_list(incomes)
            tdi.append([])

            cursor.execute("select * from expense_all_day(%s)", [idu])
            expenses = cursor.fetchall()
            tde = fetch_to_list(expenses)

            td_exp = []
            for i in range(0, len(tdi[0])):
                tdi[2].append(tdi[1][i]/30)

            for i in range(0, len(tde[0])):
                for j in range(0, len(tdi[0])):
                    if (tde[0][i])[:7] == tdi[0][j] and tdi[2][j] < tde[1][i]:
                        td_exp.append(tde[0][i])
                        break

            return td_exp