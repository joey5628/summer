export let ENV = 'DEVELOPMENT'; //PRODUCTION TESTIN DEVELOPMENT

export let codePushKey = getCodePushKey(ENV)

export function getCodePushKey (env) {
    switch (env) {
        case 'PRODUCTION':
            return 'AaK5MttCkCMUspH5KXXrvfpw-qQmc243bb7c-43cc-4555-9d1b-e41df26199aa';
        default:
            return 'SFqntHmvlcBW1e5JBz7s69PFvUoyc243bb7c-43cc-4555-9d1b-e41df26199aa';
    }
}
