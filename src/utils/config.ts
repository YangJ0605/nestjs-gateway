import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'yaml';

/**
 * 获取nestjs的环境变量 dev prod
 * @returns
 */
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

/**
 * 获取yaml文件的配置
 * @returns
 */
export const getConfig = () => {
  const env = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${env}.yaml`);

  const file = fs.readFileSync(yamlPath, 'utf-8');
  return parse(file);
};
