import GAsideMenu from '@/components/GAsideMenu';
import GBreadcrumb from '@/components/GBreadcrumb';
import GDropdown from '@/components/GDropdown';
import GFormCreator from '@/components/GFormCreator';


// 自动引动 require.context('../components/xxx',true,/\.vue$/)
// Vue.use({ install(Vue) })
function install (Vue){
    Vue.component(GAsideMenu.name,GAsideMenu);
    Vue.component(GBreadcrumb.name,GBreadcrumb);
    Vue.component(GDropdown.name,GDropdown);
    Vue.component(GFormCreator.name,GFormCreator);
}

export default {
    install
}

