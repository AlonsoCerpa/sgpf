from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template
from django.db import models
from django.db.models import Func

from xhtml2pdf import pisa


def fetch_to_list(data):
    dat = [[], []]

    for da in data:
        dat[0].append(str(da[0]))
        dat[1].append(float(da[1]))
    return dat


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None


class Month(Func):
    function = 'EXTRACT'
    template = '%(function)s(MONTH from %(expressions)s)'
    output_field = models.IntegerField()


class Day(Func):
    function = 'EXTRACT'
    template = '%(function)s(DAY from %(expressions)s)'
    output_field = models.IntegerField()