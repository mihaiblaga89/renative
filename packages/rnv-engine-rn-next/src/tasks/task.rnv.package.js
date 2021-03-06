import { TaskManager, Constants, Logger } from 'rnv';

const { logTask } = Logger;
const {
    WEB,
    CHROMECAST,
    TASK_PACKAGE,
    TASK_CONFIGURE,
    PARAMS
} = Constants;
const { executeOrSkipTask } = TaskManager;

export const taskRnvPackage = async (c, parentTask, originTask) => {
    logTask('taskRnvPackage', `parent:${parentTask}`);

    await executeOrSkipTask(c, TASK_CONFIGURE, TASK_PACKAGE, originTask);

    return true;
};

export default {
    description: 'Package source files into bundle',
    fn: taskRnvPackage,
    task: 'package',
    params: PARAMS.withBase(PARAMS.withConfigure()),
    platforms: [
        WEB,
        CHROMECAST,
    ],
};
