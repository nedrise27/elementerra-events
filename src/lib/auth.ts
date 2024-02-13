import { UnauthorizedException } from '@nestjs/common';
import * as _ from 'lodash';

export function checkAuthHeader(authHeader: string) {
  if (!_.isString(authHeader) || authHeader != process.env.PAIN_TEXT_PASSWORD) {
    throw new UnauthorizedException();
  }
}
