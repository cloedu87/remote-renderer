import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import * as pug from 'pug';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'hello index page' };
  }

  @Get('/template/:templateId')
  template(
    @Res() res: Response,
    @Param() params: any,
    @Query('param1') queryParam: string,
  ) {
    // TODO use the url params for further api- and db-calls
    console.log(params);
    console.log(queryParam);

    // TODO: make some fetchyfetchy logic to other services here

    // compile the template that could come from the database! consider moving this out of the method,
    // because this is the most resource killing step
    const compiledTemplateFunction = pug.compile(
      `
.table-2.sgx
  h3 Dies ist eine hervorragende &Uuml;berschrift
  .table-container-2
    table.type-2
      tr
        each header in headers
          th=header
      each column in columns
        tr
          td
            b=column.spalte1
          td=column.spalte2
          td=column.spalte3
          td=column.spalte4
          td=column.spalte5
    `,
    );

    // render the data that could come from surrounding API's as well!!
    const renderedTemplate = compiledTemplateFunction({
      pretty: true,
      message: 'Hi there!',
      templateId: params.templateId,
      queryParam: queryParam,
      // this are the variables and data we use in the template above.
      // could also be administrated together with the template above, in a admin-ui and a database
      headers: ['Beschreibung', 'Spalte 1', 'Spalte 2', 'Spalte 3', 'Spalte 4'],
      columns: [
        {
          spalte1: 'Victum est honer concludat',
          spalte2: 'Dolores et ea rebum.',
          spalte3: 'Stet clita kasd gubergren.',
          spalte4: 'Stet clita kasd gubergren, no sea takimata.',
          spalte5: 'Lorem ipsum dolor sit amet.',
        },
        {
          spalte1: '2 Victum est honer concludat',
          spalte2: '2 Dolores et ea rebum.',
          spalte3: '2 Stet clita kasd gubergren.',
          spalte4: '2 Stet clita kasd gubergren, no sea takimata.',
          spalte5: '2 Lorem ipsum dolor sit amet.',
        },
        {
          spalte1: '3 Victum est honer concludat',
          spalte2: '3 Dolores et ea rebum.',
          spalte3: '3 Stet clita kasd gubergren.',
          spalte4: '3 Stet clita kasd gubergren, no sea takimata.',
          spalte5: '3 Lorem ipsum dolor sit amet.',
        },
        {
          spalte1: '4 Victum est honer concludat',
          spalte2: '4 Dolores et ea rebum.',
          spalte3: '4 Stet clita kasd gubergren.',
          spalte4: '4 Stet clita kasd gubergren, no sea takimata.',
          spalte5: '4 Lorem ipsum dolor sit amet.',
        },
      ],
    });

    console.log(renderedTemplate);

    return res.send(renderedTemplate);
  }
}
