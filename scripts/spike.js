import 'dotenv/config';
import { getDailyForecast } from '../utils/weather.js';

const forecast = await getDailyForecast('Chicago, IL');