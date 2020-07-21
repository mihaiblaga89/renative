/* eslint-disable import/no-cycle */
import inquirer from 'inquirer';
import {
    writeFileSync
} from '../core/systemManager/fileutils';
import {
    logTask
} from '../core/systemManager/logger';
import {
    generateBuildConfig,
} from '../core/configManager/configParser';

import { getTemplateOptions } from '../core/templateManager';

const _writeObjectSync = (c, p, s) => {
    writeFileSync(p, s);
    generateBuildConfig(c);
};

export const _addTemplate = (c, template) => {
    logTask('addTemplate');

    c.files.project.config.templates = c.files.project.config.templates || {};

    if (!c.files.project.config.templates[template]) {
        c.files.project.config.templates[template] = {
            version: 'latest'
        };
    }

    _writeObjectSync(c, c.paths.project.config, c.files.project.config);
};

export const taskRnvTemplateAdd = async (c, parentTask, originTask) => {
    logTask('taskRnvTemplateAdd', `parent:${parentTask} origin:${originTask}`);

    const opts = getTemplateOptions(c);

    const { template } = await inquirer.prompt({
        type: 'list',
        message: 'Pick which template to install',
        name: 'template',
        choices: opts.keysAsArray
    });

    _addTemplate(c, template);
};

export default {
    description: '',
    fn: taskRnvTemplateAdd,
    task: 'template add',
    params: [],
    platforms: [],
    skipPlatforms: true,
};
