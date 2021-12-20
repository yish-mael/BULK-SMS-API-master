import {
  decodeJwtToken,
  encodeToJwtToken,
  getPhoneNumberInfo,
  GeneratePin,
  getTokens,
} from '../../src/utills/utills';
import Constants from '../../src/constants/index';

describe('Test helper function', () => {
  test('Should generate 4 digit pin seperated by comma', (done) => {
    try {
      const pin = GeneratePin();
      const pinLength = pin.split(',').length;
      expect(pinLength).toBe(4);
      done();
    } catch (e) {
      done(e);
    }
  });

  test('Should reurn access token and refresh token when', (done) => {
    try {
      const { accessToken, refreshToken } = getTokens({
        userId: 'solex',
      } as any);
      expect(accessToken).toBeDefined();
      expect(refreshToken).toBeDefined();
      done();
    } catch (e) {
      done(e);
    }
  });
});

describe('Should ensure that tokens are generated using JWT', () => {
  test('It should encode payload and get payload back after decoding it', (done) => {
    try {
      let payload = { name: 'dixre', app: 'hanwok' };
      let token = encodeToJwtToken(
        payload,
        Constants.TokenExpiry.ACCESS_TOKENS,
      );
      let decode = decodeJwtToken(token) as {
        name: string;
        app: string;
      };
      expect(decode.name).toBe(payload.name);
      expect(decode.app).toBe(payload.app);

      done();
    } catch (e) {
      done(e);
    }
  });

  test('Should throw a token expire error ', (done) => {
    try {
      let payload = { name: 'dixre', app: 'hanwok' };
      let token = encodeToJwtToken(payload, '-10s');

      decodeJwtToken(token) as {
        name: string;
        app: string;
      };
    } catch (e) {
      expect(e.name).toBe('TokenExpiredError');
      expect(e.message).toBe('jwt expired');
      done();
    }
  });
});

describe('Should get the correct formatt of a phone number', () => {
  test('it should get the phone number information e.g international and local formatt, country code and e.g NG which we are interested in .', async (done) => {
    try {
      let intlFormat = await getPhoneNumberInfo('09050709444', 'NG');
      expect(intlFormat).toBe('+2349050709444');
      done();
    } catch (e) {
      done(e);
    }
  });
});
