import path from 'path';
import { logInfo, logTask, logSuccess } from '../../core/systemManager/logger';
import { PARAMS, RNV_PACKAGES } from '../../core/constants';
import {
    fsExistsSync, fsRenameSync, fsUnlinkSync, fsLstatSync
} from '../../core/systemManager/fileutils';

const _unlinkPackage = (c, key) => {
    const rnvPath = path.join(c.paths.project.nodeModulesDir, key);
    const rnvPathUnlinked = path.join(c.paths.project.nodeModulesDir, `${key}_unlinked`);

    if (!fsExistsSync(rnvPathUnlinked)) {
        logInfo(`${key} is not linked. SKIPPING`);
    } else if (fsExistsSync(rnvPath)) {
        if (fsLstatSync(rnvPath).isSymbolicLink()) {
            fsUnlinkSync(rnvPath);
            fsRenameSync(rnvPathUnlinked, rnvPath);
            logSuccess(`${key} => unlink => SUCCESS`);
        } else {
            logInfo(`${key} is not a symlink anymore. SKIPPING`);
        }
    }
};


export const taskRnvUnlink = async (c) => {
    logTask('taskRnvUnlink');

    RNV_PACKAGES.forEach((pkg) => {
        if (!pkg.skipLinking) {
            _unlinkPackage(c, pkg.packageName);
        }
    });

    return true;
};

export default {
    description: '',
    fn: taskRnvUnlink,
    task: 'unlink',
    params: PARAMS.withBase(),
    platforms: [],
    skipPlatforms: true,
    isGlobalScope: true
};
