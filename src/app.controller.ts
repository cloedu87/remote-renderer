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
    // TODO: make some fetchyfetchy logic to other services here

    // compile the template that could come from the database! consider moving this out of the method,
    // because this is the most resource killing step
    const compiledTemplateFunction = pug.compile(
      `
div.container
  div template compiled and rendered serverside :-)
  code= message
  div= templateId
  code= queryParam
    `,
    );

    // render the data that could come from te database as well!!
    const renderedTemplate = compiledTemplateFunction({
      pretty: true,
      message: 'Hi there!',
      templateId: params.templateId,
      queryParam: queryParam,
    });

    console.log(renderedTemplate);

    return res.send(renderedTemplate);
  }
}
