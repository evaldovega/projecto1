import * as React from "react"
import Svg, {Path, Mask, G} from "react-native-svg"

// @ts-ignore
function SvgComponent(props) {
    return (
        <Svg width={72} height={72} viewBox="0 0 72 72" fill="none" {...props}>
            <Path
                d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36z"
                fill="#fff"
            />
            <Mask
                id="prefix__a"
                x={0}
                y={0}
                width={72}
                height={72}
            >
                <Path
                    d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36z"
                    fill="#fff"
                />
            </Mask>
            <G mask="url(#prefix__a)">
                <Mask
                    id="prefix__b"
                    x={24}
                    y={59}
                    width={26}
                    height={29}
                >
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24.767 59.413h24.36V87.94h-24.36V59.413z"
                        fill="#fff"
                    />
                </Mask>
                <G mask="url(#prefix__b)">
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.148 59.724c.241-.051 2.213 8.98 1.956 12.493-.258 3.513-1.956 15.723-1.956 15.723h-8.132l-1.465-17.279.276 17.28H26.902s-2.532-11.877-2.08-15.473c.451-3.596 2.855-13.055 2.855-13.055l19.471.311z"
                        fill="#1A2E35"
                    />
                </G>
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M38.369 61.804c.009 0 .014.12.017.337.003.218 0 .532-.009.92-.017.778-.067 1.851-.167 3.033a50.78 50.78 0 01-.345 3.017c-.056.385-.107.695-.146.91-.04.213-.065.33-.074.33-.008-.002.001-.122.025-.338l.107-.913c.09-.77.207-1.837.308-3.016.1-1.18.163-2.25.203-3.026l.049-.917c.012-.218.023-.337.032-.337zM39.837 62.534c-.001-.006.064-.023.18-.002a.773.773 0 01.583.566c.03.124.025.27-.029.405a.8.8 0 01-.73.51c-.35-.008-.618-.27-.707-.54a.69.69 0 01-.016-.406.712.712 0 01.626-.51c.12-.002.18.03.177.036-.002.01-.065-.004-.172.012a.66.66 0 00-.388.22.594.594 0 00-.118.61c.08.23.317.448.6.451.281.003.53-.2.62-.426a.62.62 0 00-.093-.618.755.755 0 00-.365-.263c-.104-.033-.168-.034-.168-.045zM48.358 64.05c.003.007-.072.04-.213.08-.14.043-.349.088-.61.114a3.894 3.894 0 01-2.008-.353 3.89 3.89 0 01-1.544-1.33 3.359 3.359 0 01-.3-.544c-.056-.136-.078-.213-.072-.217.022-.01.14.293.445.71.3.414.816.93 1.526 1.267a4.098 4.098 0 001.946.378c.515-.028.825-.128.83-.105z"
                    fill="#375A64"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.768 20.74c-.616 2.243-1.549 4.042-2.458 4.944-.91.901-1.883 1.958-1.85 3.239.012.502.18 1.036-.04 1.488-.285.588-1.046.715-1.615 1.035-.842.474-1.312 1.477-1.278 2.442.034.966.52 1.88 1.201 2.565.708.712 1.829 1.21 2.708.725.53-.293.833-.867 1.1-1.411 1.386-2.818 2.642-5.7 3.762-8.633M35.438 11.135c1.56-1.73 4.223-2.362 6.393-1.516 2.171.847 3.704 3.115 3.68 5.445-.017 1.502-.604 3.076-.01 4.456.42.976 1.39 1.713 1.524 2.768.155 1.223-.89 2.332-.836 3.563.036.804.54 1.515 1.12 2.073.58.558 1.254 1.017 1.786 1.621 1.478 1.68 1.573 4.331.456 6.27-1.118 1.937-3.275 3.153-5.497 3.417-2.221.262-4.485-.35-6.452-1.417-1.28-.695-2.483-1.612-3.245-2.854-.761-1.243-1.022-2.852-.42-4.18"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M40.162 29.857s5.014 1.48 5.502 2.274c.488.794 2.063 10.105 2.063 10.105l-3.079 10.967s2.545 4.098 2.672 6.17c-5.69 3.67-12.11 2.641-18.83-.3l-.477-10.723-.64-17.13 4.14-1.449 8.65.086z"
                    fill="#E1E1E1"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45.736 55.413c0 .004-.064.003-.185-.004l-.526-.035-1.935-.155-6.379-.557-6.377-.593-1.931-.195-.525-.059a1.075 1.075 0 01-.183-.029c0-.004.064-.003.185.004.132.009.307.02.526.036l1.935.154 6.38.557 6.377.593 1.931.195.525.059c.12.015.182.025.182.029zM39.854 43.332c0 .035-2.203.063-4.919.063-2.717 0-4.92-.028-4.92-.063s2.203-.063 4.92-.063c2.716 0 4.919.028 4.919.063zM46.474 35.974c0 .009-.14.022-.391.037l-1.066.061c-.9.05-2.142.124-3.513.229-1.37.105-2.61.221-3.507.31l-1.063.102c-.25.022-.39.031-.391.022-.001-.008.136-.033.386-.071.25-.038.61-.087 1.058-.142a78.793 78.793 0 017.026-.539c.451-.014.816-.02 1.068-.02.253-.002.392.002.393.011z"
                    fill="#FF4F5B"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45.664 32.13l5.03 13.65 3.376-6.725 4.413.904-2.541 10.599a4.494 4.494 0 01-7.773 2.404l-1.58-1.733-.925-19.098z"
                    fill="#E1E1E1"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M50.59 54.402c-.008 0-.02-.122-.036-.342-.015-.221-.03-.54-.044-.936a50.612 50.612 0 01.18-6.177c.037-.394.072-.712.1-.931.028-.22.048-.34.057-.34.008.001.005.123-.008.344l-.06.934a90.34 90.34 0 00-.146 3.083 90.758 90.758 0 00-.034 3.085l.004.936c0 .22-.004.343-.012.344zM57.092 46.074c-.012.032-1.249-.408-2.762-.982-1.513-.575-2.73-1.067-2.717-1.1.012-.032 1.248.407 2.762.982 1.513.575 2.73 1.067 2.717 1.1z"
                    fill="#FF4F5B"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M59.543 38.398l-2.117 1.56-2.35-.576.563-.626 3.904-.358z"
                    fill="#FFBF9D"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M67.198 19.403l-17.13 7.422.083 4.964-1.938 2.03 6.545 5.85 1.911-2.139 5.093-.713 5.436-17.414z"
                    fill="#FAFAFA"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M67.198 19.403l-5.381 17.431-.01.035-.037.005-5.092.717.037-.02-1.911 2.14-.041.046-.047-.042-3.341-2.985-3.204-2.864-.048-.043.045-.047 1.939-2.03-.017.044-.08-4.964v-.04l.035-.015 17.153-7.368-17.107 7.475.035-.054.087 4.964v.025l-.018.018-1.937 2.031-.004-.089 3.205 2.863 3.34 2.987-.088.005 1.913-2.138.015-.017.022-.003 5.093-.71-.046.04 5.49-17.397z"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M60.248 31.562a2.687 2.687 0 11-4.007-3.58 2.687 2.687 0 014.007 3.58z"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M67.198 19.403c.026.022-1.957 2.362-4.429 5.225-2.473 2.863-4.499 5.166-4.525 5.143-.026-.023 1.957-2.362 4.43-5.226 2.472-2.862 4.498-5.165 4.524-5.142z"
                    fill="#1A2E35"
                />
                <Mask
                    id="prefix__c"
                    x={13}
                    y={36}
                    width={40}
                    height={44}
                >
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 36.118h39.669V79.68H13V36.118z"
                        fill="#fff"
                    />
                </Mask>
                <G mask="url(#prefix__c)">
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.429 78.592a4.283 4.283 0 01-.355-6.03l32.208-36.444 6.387 5.709-32.176 36.408a4.283 4.283 0 01-6.064.357z"
                        fill="#FF4F5B"
                    />
                </G>
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M53.282 42.375l-7.51-6.713 2.332-2.61 7.511 6.714-2.333 2.61zM67.155 20.808l-1.429-1.198 1.198-1.429 1.429 1.198-1.198 1.43z"
                    fill="#FF4F5B"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M78.864 29.068c-.062.073-5.528-4.406-12.208-10.003-6.681-5.6-12.046-10.197-11.985-10.27.062-.074 5.527 4.404 12.209 10.003 6.68 5.598 12.045 10.196 11.984 10.27z"
                    fill="#FF4F5B"
                />
                <Mask
                    id="prefix__d"
                    x={54}
                    y={8}
                    width={2}
                    height={2}
                >
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M54.119 8.242h1.105v1.105H54.12V8.242z"
                        fill="#fff"
                    />
                </Mask>
                <G mask="url(#prefix__d)">
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M55.095 9.15a.553.553 0 11-.847-.71.553.553 0 01.847.71z"
                        fill="#FF4F5B"
                    />
                </G>
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M46.282 36.118l6.387 5.709-.862.974-5.833-6.336.308-.347z"
                    fill="#000"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M50.162 34.892v4.568l.93.956v-4.694l-.93-.83z"
                    fill="#fff"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M57.826 32.76l2.344.937.502 1.889-1.129 2.812-4.142.603 1.213-1.24-.156-1.08s-1.156-.362-1.184-.54c-.029-.176.143-.77.32-.798.178-.028 1.39.423 1.39.423s-1.435-1.136-1.395-1.318c.04-.183.194-.65.48-.7.287-.053 2.602 1.038 2.602 1.038l.376.858.328-1.371s-2.058-.577-1.55-1.512z"
                    fill="#FFBF9D"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M57.53 37.19c.015.004.059-.082.08-.234.023-.151.012-.37-.07-.592a1.255 1.255 0 00-.332-.495c-.115-.101-.204-.138-.212-.126-.023.029.282.248.43.663.158.412.07.777.105.784zM58.645 36.78c.014-.007-.07-.228-.093-.614-.018-.191-.029-.428-.118-.68a1.004 1.004 0 00-.216-.363 1.064 1.064 0 00-.383-.241 41.496 41.496 0 00-1.434-.487c-.37-.118-.6-.183-.606-.167-.006.015.215.109.577.247.36.14.868.32 1.418.519.133.053.254.12.343.211.091.092.153.205.196.32.089.23.11.46.138.65.046.39.162.615.178.605zM59.183 36.357c.033-.006.026-.213-.015-.462-.041-.25-.102-.449-.134-.443-.033.005-.027.212.014.462.042.25.102.448.135.443z"
                    fill="#FF9A6C"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.596 53.105s3.76-1.291 3.847-1.333c.089-.042 2.655-1.237 2.437-1.925 0 0 .732-.578.506-.903l-1.03.433s1.46-.944 1.201-1.793c0 0 .152-.288-.005-.466-.156-.178-.909.36-1.469.697l-1.082.437c-.473.19-.996.215-1.486.071a.467.467 0 01-.325-.55c.12-.524.266-1.356-.08-2.536 0 0-.266.095-.45.673-.237.744-.98 1.316-1.252 1.805l-.586 1.057a1.148 1.148 0 01-.71.553l.258 1.96.226 1.82z"
                    fill="#FFBF9D"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M45.67 49.558a.56.56 0 00.13-.04c.084-.03.2-.077.344-.14a7.883 7.883 0 002.045-1.329c.116-.105.207-.192.267-.256.061-.063.093-.1.09-.102a.576.576 0 00-.106.084c-.066.058-.161.14-.28.241-.238.2-.578.466-.976.724-.399.26-.779.461-1.059.597-.14.069-.254.122-.333.158a.578.578 0 00-.121.063zM45.736 50.307c.003.007.11-.023.277-.091.166-.068.391-.177.626-.319.236-.142.438-.287.58-.396.142-.11.225-.184.22-.19-.012-.017-.366.25-.832.533-.233.14-.451.254-.612.331-.16.078-.262.123-.259.132zM45.703 51.207c.003.007.14-.04.354-.136.213-.096.501-.243.803-.434.302-.191.56-.387.74-.536.18-.148.284-.248.28-.255-.007-.006-.121.081-.308.22a9.838 9.838 0 01-1.535.965c-.207.106-.337.167-.334.176z"
                    fill="#FF9A6C"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.596 53.105L27.645 57.3a8.328 8.328 0 01-4.86-8.324c.439-4.93 1.02-11.416 1.192-13.044.285-2.715 3.396-4.713 3.396-4.713 4.28.278 3.331 8.739 3.331 8.739l-1.721 9.732 12.13-.486.483 3.9z"
                    fill="#E1E1E1"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.983 49.691c-.009 0-.003-.139.017-.388.016-.25.056-.61.108-1.056.11-.889.298-2.112.548-3.455.248-1.343.501-2.554.698-3.427.098-.437.181-.79.242-1.032.061-.243.1-.376.108-.374.008.001-.014.138-.06.384l-.203 1.04c-.174.878-.413 2.09-.662 3.432a103.48 103.48 0 00-.583 3.444l-.148 1.049c-.034.248-.057.384-.065.383z"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M41.112 49.206a.512.512 0 01-.131.02l-.38.032c-.329.025-.806.055-1.396.084-1.18.061-2.81.118-4.61.17l-4.611.131-1.398.045-.38.01a.536.536 0 01-.133-.007.54.54 0 01.132-.02l.379-.032c.329-.025.806-.055 1.396-.085 1.18-.06 2.81-.117 4.611-.169l4.61-.131 1.398-.045.38-.009c.087 0 .133.001.133.005z"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.51 46.002c0 .008-.092.006-.256-.005-.192-.014-.423-.03-.695-.051a66.783 66.783 0 00-2.293-.14 67.071 67.071 0 00-2.296-.053l-.697-.006c-.165-.003-.256-.009-.256-.017 0-.009.09-.02.255-.032.164-.013.402-.024.697-.034a32.51 32.51 0 012.303.017c.898.038 1.71.108 2.296.176.292.034.528.065.691.092.163.026.253.044.252.053zM30.704 39.286c-.002.035-1.582-.004-3.53-.085-1.948-.082-3.526-.176-3.525-.211.002-.035 1.582.003 3.53.085 1.948.082 3.527.176 3.525.21zM24.092 54.086c-.007-.005.041-.084.135-.223.092-.14.235-.336.42-.572a14.39 14.39 0 013.447-3.145c.252-.162.46-.287.607-.366.148-.08.23-.12.235-.113.01.017-.304.212-.792.553-.49.34-1.146.839-1.818 1.45a18.35 18.35 0 00-1.61 1.677c-.385.456-.608.75-.624.739zM34.102 55.413c-.034.005-.27-1.304-.525-2.925-.255-1.622-.435-2.94-.4-2.946.034-.005.269 1.304.525 2.926.255 1.62.435 2.94.4 2.945z"
                    fill="#FF4F5B"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.56 57.301l15.625-4.743c-1.172 1.541-3.452 2.978-5.172 3.865-1.72.887-3.56 1.513-5.393 2.136-.996.338-2.016.68-3.068.672-1.052-.01-2.078-.311-2.63-1.206l.639-.724z"
                    fill="#000"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.254 17.137c.301-.677.036-1.547-.575-1.965-.612-.419-1.496-.363-2.07.106-.574.468-.808 1.301-.593 2.01.257.846 1.143 1.455 2.025 1.391.883-.063 1.672-.793 1.805-1.667"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.59 13.057l-.01 1.142-.242 17.09c-.028 1.984 1.656 3.589 3.78 3.602 2.146.014 3.934-1.597 3.995-3.601.065-2.104.171-4.316.171-4.316s2.722-.376 3.38-3.895c.329-1.75.32-4.636.236-6.996a3.735 3.735 0 00-4.021-3.594l-7.29.568z"
                    fill="#FFBF9D"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M42.703 18.14c.002.24-.2.439-.45.446a.434.434 0 01-.456-.422c-.002-.24.2-.44.45-.446a.434.434 0 01.456.422zM43.234 17.565c-.058.058-.395-.206-.883-.218-.487-.02-.852.222-.903.16-.025-.027.035-.132.194-.24.156-.11.421-.212.725-.203.304.01.557.13.7.248.147.119.195.227.167.253zM37.928 18.093c.002.24-.2.439-.45.446a.434.434 0 01-.455-.422c-.002-.24.2-.44.449-.446a.434.434 0 01.456.422zM38.435 17.524c-.058.057-.394-.206-.882-.218-.487-.02-.852.222-.904.16-.025-.027.035-.132.194-.241a1.246 1.246 0 011.426.046c.146.119.195.227.166.253zM40.106 21.19c-.001-.027.303-.07.797-.12.125-.01.243-.031.266-.116.032-.089-.016-.224-.072-.371l-.343-.959c-.474-1.365-.814-2.485-.759-2.504.056-.019.485 1.072.959 2.437l.326.964c.044.143.12.306.052.49a.313.313 0 01-.21.178c-.08.021-.15.021-.213.023-.495.013-.802.007-.803-.021z"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M40.284 26.974s-2.383.087-4.7-1.394c0 0 1.082 2.46 4.63 2.227l.07-.833zM39.867 22.361a.88.88 0 00-.779-.348.803.803 0 00-.562.282c-.134.168-.167.413-.055.58.127.19.4.24.635.18s.44-.208.634-.355a.537.537 0 00.143-.14c.035-.058.044-.133.005-.182"
                    fill="#FF9A6C"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M38.661 21.489c.08-.003.066.527.509.915.442.39 1.008.346 1.01.42.007.034-.128.1-.367.1a1.321 1.321 0 01-.844-.32 1.15 1.15 0 01-.393-.768c-.014-.222.05-.351.085-.347zM38.614 15.615c-.052.132-.537.056-1.111.109-.576.041-1.042.196-1.115.075-.032-.058.052-.18.242-.304.188-.123.487-.237.832-.265.344-.028.658.035.864.125.208.09.31.198.288.26zM43.093 16.148c-.089.108-.422-.015-.826-.032-.403-.03-.748.054-.824-.064-.033-.058.024-.167.177-.268.15-.1.399-.18.676-.163.278.016.516.124.653.24.14.119.183.234.144.287z"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M37.035 11.938c.944 1.256-.039 3.034-1.127 4.168-1.089 1.134-2.415 2.45-2.118 3.994.344 1.789 2.792 2.935 2.428 4.72-.133.652-.647 1.208-.649 1.873-.004 1.2 1.55 1.784 1.996 2.898.613 1.527-1.072 3.05-1.097 4.694-.015.934.514 1.806.542 2.74.059 1.912-2.204 3.313-4.06 2.842-1.855-.47-3.125-2.28-3.53-4.152-.404-1.87.209-4.5.509-6.39l-3.214.745c-.6-.57.22-1.178.354-1.994.339-2.046 1.683-3.778 2.323-5.75.56-1.724.564-3.57.808-5.367.244-1.796.801-3.667 2.173-4.852 1.371-1.185 3.745-1.33 4.855.103"
                    fill="#1A2E35"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.827 17.745c.003-.032.541.143 1.416.042.87-.09 2.046-.531 3.075-1.391 1.03-.864 1.742-1.87 2.247-2.59l.59-.863c.14-.204.22-.315.227-.31.007.004-.059.124-.186.336-.127.212-.315.517-.557.888-.488.734-1.195 1.758-2.24 2.635-1.049.877-2.257 1.315-3.146 1.384a3.95 3.95 0 01-1.052-.036c-.123-.016-.216-.048-.28-.063-.063-.017-.095-.027-.094-.032zM34.017 18.218c.008.01-.174.172-.516.36a4.37 4.37 0 01-2.963.434c-.381-.083-.602-.185-.597-.197.007-.02.235.05.614.11.377.06.908.09 1.485.007a5.076 5.076 0 001.42-.433c.346-.165.545-.298.557-.28zM45.508 15.842c.006.031-.541.04-1.1-.295-.563-.33-.818-.814-.788-.823.031-.024.319.404.852.715.528.318 1.042.364 1.036.403zM45.282 17.033c.008.031-.302.112-.675.017-.374-.091-.61-.309-.587-.332.02-.03.271.126.617.21.345.089.64.068.645.105z"
                    fill="#375A64"
                />
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.093 18.514c-.03.009-.162-.516-.101-1.172.056-.656.277-1.149.306-1.136.036.013-.127.51-.181 1.148-.059.636.014 1.155-.024 1.16z"
                    fill="#FF4F5B"
                />
            </G>
        </Svg>
    )
}

const SvgAvatar = React.memo(SvgComponent)
export default SvgAvatar