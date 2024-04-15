'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-basic documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' : 'data-bs-target="#xs-controllers-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' :
                                            'id="xs-controllers-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' : 'data-bs-target="#xs-injectables-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' :
                                        'id="xs-injectables-links-module-AppModule-712465e5b8f6d969eefc79aa6418783a89dc14159a5a58608a007f2db707f05bc6e3a20fe696e6819ec7add307cac8d262b44eed6df8cd466d5497a261897dfa"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' :
                                            'id="xs-controllers-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' :
                                        'id="xs-injectables-links-module-AuthModule-9f20a49ad194c060faf7258b15564e01c31c89c0969e1d103c8bdabba94640d5f26472e0a3ba333987c8169fa2bc113ca9f93e91f4f4548a8c7fed0ed0ff9dc3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompaniesModule.html" data-type="entity-link" >CompaniesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' : 'data-bs-target="#xs-controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' :
                                            'id="xs-controllers-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                            <li class="link">
                                                <a href="controllers/CompaniesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' : 'data-bs-target="#xs-injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' :
                                        'id="xs-injectables-links-module-CompaniesModule-ae69a93bee79c1a5a536a397f68f6f8b865e4a8867752ee69c1cdccced0d4cb72d6c7435143908fc2b6be83010a082ce92bb5da1f50316eb02ba60f28b95adc8"' }>
                                        <li class="link">
                                            <a href="injectables/CompaniesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompaniesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' :
                                            'id="xs-controllers-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' :
                                        'id="xs-injectables-links-module-DatabasesModule-8c91950c13167dc8a92a3986a74b5105ba93ab0d3397d7417f5aef807deffc3072e6adac19841bed3473b05ff5c6977cce726f3a5edf197868a3f4269540c866"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' :
                                            'id="xs-controllers-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' :
                                        'id="xs-injectables-links-module-FilesModule-893375dc43e298bfafa7d47b242afe91346cdc96180dcad7904e87711356bc216ee2ce3160c8edcb2b986b5a705905b94a0ecf876301acae00b9236b9f129163"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' :
                                            'id="xs-controllers-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' :
                                        'id="xs-injectables-links-module-JobsModule-a67a09d609a0f2c8b4e1802e7fcad67c7c9f3cc2833e29f25eb37c7211445c57c710b8026b80699f5969e270059d2e77fbac38ef80469db856cf870d0a5cd532"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' : 'data-bs-target="#xs-controllers-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' :
                                            'id="xs-controllers-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' : 'data-bs-target="#xs-injectables-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' :
                                        'id="xs-injectables-links-module-MailModule-16c33f8f0697af6cd0b01a87a30b8df8f14e87f35c582b1f51f6d64dee3031db372c50594c8f48912585d6403ebab5a591992709653ea6ea5a1ae560f03fbf01"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' :
                                            'id="xs-controllers-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' :
                                        'id="xs-injectables-links-module-PermissionsModule-3df142d4679559d8b9e2c7d5aa5555b3fde32e0b6a0e41724df91ce7a3955362d7a82a62138f55418ef3da36edac471057a2b95ea802ecd520ae2c887c671701"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' :
                                            'id="xs-controllers-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' :
                                        'id="xs-injectables-links-module-ResumesModule-91e2969653eb4ca36a277185d184cf612b46d78cfe47ef58036572e9cbcabfdc18e689561ccebf58488bf08a648f06778eeaed41e25a641de2c09d980268200c"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' :
                                            'id="xs-controllers-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' :
                                        'id="xs-injectables-links-module-RolesModule-afeeefe3f8ef3b6448e2c338d4a0a6d9db182cce37f686344beb1c1d80ede60216c1692248e994f817f92b07955931473a71361e71ff06bc4205501d993bff01"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' :
                                            'id="xs-controllers-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' :
                                        'id="xs-injectables-links-module-SubscribersModule-60fc4a27a53720be4d2acbfc081a313336fce429804d31653a3b4767220bb0bfdfe3a9b6fd02271e8ebda0f42f77d17e09f0e6eb39d5696541c642b519f85bbe"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' :
                                            'id="xs-controllers-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' :
                                        'id="xs-injectables-links-module-UsersModule-e42999059d5731e7f0935720b42c61603b50bacf6a9b697d8979a852483ecfbfe9bff2aa249ebd56d4f303f48bd5d8f716554cfd0f1bfe8b2b341dc5ce216e43"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CompaniesController.html" data-type="entity-link" >CompaniesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompaniesService.html" data-type="entity-link" >CompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});