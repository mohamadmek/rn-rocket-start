import fs from 'fs/promises';
import path from 'path';

type CopyBoilerplateOptions = {
  boilerplatePath: string;
  targetPath: string;
  excluded: Array<string>;
  overwrite?: boolean;
};

/**
 * Recursively copies a directory and renames it to "mohamad" in the current working directory.
 * @param sourceDir - The source directory to copy.
 * @param targetDir - The target directory to copy to.
 */
async function copyDirectoryRecursive(
  sourceDir: string,
  targetDir: string,
): Promise<void> {
  // Ensure the target directory exists
  await fs.mkdir(targetDir, { recursive: true });

  // Read the contents of the source directory
  const filesAndFolders = await fs.readdir(sourceDir, { withFileTypes: true });

  // Copy each item in the source directory
  for (const item of filesAndFolders) {
    const sourcePath = path.join(sourceDir, item.name);
    const targetPath = path.join(targetDir, item.name);

    if (item.isDirectory()) {
      // Recursively copy the directory
      await copyDirectoryRecursive(sourcePath, targetPath);
    } else if (item.isFile() || item.isSymbolicLink()) {
      // Copy files and symbolic links
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

/**
 * Copies a directory to the current working directory and renames it to "mohamad".
 * @param sourceDir - The source directory to copy.
 */
export async function copyDirectoryToMohamad(sourceDir: string): Promise<void> {
  const targetDir = path.join(process.cwd(), 'mohamad'); // Destination renamed to "mohamad"

  try {
    try {
      await fs.access(targetDir);
      console.log(
        `The directory "${targetDir}" already exists. Aborting copy operation.`,
      );
      process.exit(1);
    } catch {
      // Target directory does not exist, proceed with copy
      console.log(
        `Target directory "${targetDir}" does not exist, proceeding with copy.`,
      );
    }

    // Check if source directory exists
    const sourceStats = await fs.stat(sourceDir);
    if (!sourceStats.isDirectory()) {
      throw new Error(`Source path is not a directory: ${sourceDir}`);
    }

    // Start copying the directory recursively
    await copyDirectoryRecursive(sourceDir, targetDir);
    console.log(`Successfully copied "${sourceDir}" to "${targetDir}"`);
  } catch (error) {
    console.error(`Error copying directory: ${(error as Error).message}`);
    process.exit(1);
  }
}

//   export async function renameReactNativeApp(
//     toolbox: GluegunToolbox,
//     oldName: string,
//     newName: string,
//     oldBundleIdentifier: string,
//     newBundleIdentifier: string,
//   ) {
//     const { parameters, filesystem, print, strings } = toolbox
//     const { kebabCase } = strings
//     const { path } = filesystem

//     // debug?
//     const debug = boolFlag(parameters.options.debug)
//     const log = <T = unknown>(m: T): T => {
//       debug && print.info(` ${m}`)
//       return m
//     }

//     // lower case stuff
//     const oldnamelower = oldName.toLowerCase()
//     const newnamelower = newName.toLowerCase()

//     // kebab case
//     const oldnamekebab = kebabCase(oldName)
//     const newnamekebab = kebabCase(newName)

//     // SCREAMING_SNAKE_CASE
//     const oldnamesnake = oldnamelower.replace(/[^a-z0-9]/g, "_").toUpperCase()
//     const newnamesnake = newnamelower.replace(/[^a-z0-9]/g, "_").toUpperCase()

//     async function rename(oldFile: string, newFile: string) {
//       log(`Renaming ${oldFile} to ${newFile}`)
//       return filesystem.renameAsync(oldFile, newFile)
//     }

//     // rename files and folders

//     // prettier-ignore
//     await Promise.allSettled([
//       rename(`ios/${oldName}.xcodeproj/xcshareddata/xcschemes/${oldName}.xcscheme`, `${newName}.xcscheme`),
//       rename(`ios/${oldName}Tests/${oldName}Tests.m`, `${newName}Tests.m`),
//       rename(`ios/${oldName}/${oldName}-Bridging-Header.h`, `${newName}-Bridging-Header.h`),
//       rename(`ios/${oldName}/${oldName}.entitlements`, `${newName}.entitlements`),
//       rename(`ios/${oldName}.xcworkspace`, `${newName}.xcworkspace`),
//       rename(`ios/${oldName}`, `${newName}`),
//     ])

//     // these we delay to avoid race conditions
//     await Promise.allSettled([
//       rename(`ios/${oldName}Tests`, `${newName}Tests`),
//       rename(`ios/${oldName}.xcodeproj`, `${newName}.xcodeproj`),
//     ])

//     // if the bundle identifier / android package name changed,
//     // we need to move everything to the new folder structure
//     const oldPath = oldBundleIdentifier.replace(/\./g, "/")
//     const newPath = newBundleIdentifier.replace(/\./g, "/")

//     if (oldBundleIdentifier !== newBundleIdentifier) {
//       log(`Renaming bundle identifier to ${newBundleIdentifier}`)

//       // move everything at the old bundle identifier path to the new one
//       await Promise.allSettled([
//         filesystem.moveAsync(
//           `android/app/src/main/java/${oldPath}`,
//           `android/app/src/main/java/${newPath}`,
//         ),
//         filesystem.moveAsync(
//           `android/app/src/debug/java/${oldPath}`,
//           `android/app/src/debug/java/${newPath}`,
//         ),
//         filesystem.moveAsync(
//           `android/app/src/release/java/${oldPath}`,
//           `android/app/src/release/java/${newPath}`,
//         ),
//       ])
//     }

//     // here's a list of all the files to patch the name in
//     const filesToPatch = [
//       `app.json`,
//       `package.json`,
//       `android/settings.gradle`,
//       `android/app/_BUCK`,
//       `android/app/BUCK`,
//       `android/app/build.gradle`,
//       `android/app/src/debug/java/${newPath}/ReactNativeFlipper.java`,
//       `android/app/src/release/java/${newPath}/ReactNativeFlipper.java`,
//       `android/app/src/main/AndroidManifest.xml`,
//       `android/app/src/main/java/${newPath}/MainActivity.java`,
//       `android/app/src/main/java/${newPath}/MainApplication.java`,
//       `android/app/src/main/java/${newPath}/MainApplication.java`,
//       `android/app/src/main/java/${newPath}/newarchitecture/MainApplicationReactNativeHost.java`,
//       `android/app/src/main/java/${newPath}/newarchitecture/components/MainComponentsRegistry.java`,
//       `android/app/src/main/java/${newPath}/newarchitecture/modules/MainApplicationTurboModuleManagerDelegate.java`,
//       `android/app/src/main/jni/Android.mk`,
//       `android/app/src/main/jni/MainApplicationTurboModuleManagerDelegate.h`,
//       `android/app/src/main/jni/MainComponentsRegistry.h`,
//       `android/app/src/main/res/values/strings.xml`,
//       `ios/Podfile`,
//       `ios/main.jsbundle`, // this file could just be regenerated, but this isn't bad to do
//       `ios/${newName}/Info.plist`,
//       `ios/${newName}.xcodeproj/project.pbxproj`,
//       `ios/${newName}.xcodeproj/xcshareddata/xcschemes/${newName}.xcscheme`,
//       `ios/${newName}.xcworkspace/contents.xcworkspacedata`,
//       `ios/${newName}Tests/${newName}Tests.m`,
//       `ios/${newName}/AppDelegate.mm`,
//       `ios/${newName}/LaunchScreen.storyboard`,
//     ]

//     // patch the files
//     await Promise.allSettled(
//       filesToPatch.map(async (file) => {
//         // no need to patch files that don't exist
//         const exists = await filesystem.existsAsync(path(file))
//         if (!exists) return

//         const content = await filesystem.readAsync(path(process.cwd(), file), "utf8")

//         log(`Patching ${file} - ${oldName} to ${newName} and variants`)

//         // replace all instances of the old name and all its variants
//         const newContent = content
//           .replace(new RegExp(oldBundleIdentifier, "g"), newBundleIdentifier)
//           .replace(new RegExp(oldnamekebab, "g"), newnamekebab)
//           .replace(new RegExp(oldnamesnake, "g"), newnamesnake)
//           .replace(new RegExp(oldName, "g"), newName)
//           .replace(new RegExp(oldnamelower, "g"), newnamelower)

//         // write the new content back to the file
//         await filesystem.writeAsync(file, newContent, { atomic: true })
//       }),
//     )
//   }
