import { LoadWatchComponent } from './components/load-watch/load-watch.component';
import { InfoBubbleComponent } from './components/info-bubble/info-bubble.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'swiper/angular';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { AudioOptionsComponent } from './components/audio-options/audio-options.component';
import { ButtonComponent } from './components/button/button.component';
import { CardCorouselComponent } from './components/card-corousel/card-corousel.component';
import { CardRoundedComponent } from './components/card-rounded/card-rounded.component';
import { CardWatchButtonComponent } from './components/card-watch-button/card-watch-button.component';
import { CardComponent } from './components/card/card.component';
import { CensorshipSmallComponent } from './components/censorship-small/censorship-small.component';
import { CensorshipComponent } from './components/censorship/censorship.component';
import { ChannelsSectionComponent } from './components/channels-section/channels-section.component';
import { CheckConnectionComponent } from './components/check-connection/check-connection.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ChipComponent } from './components/chip/chip.component';
import { ChooseAvatarComponent } from './components/choose-avatar/choose-avatar.component';
import { ComingSoonSectionComponent } from './components/coming-soon-section/coming-soon-section.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CorouselComponent } from './components/corousel/corousel.component';
import { CustomProgressBarComponent } from './components/custom-progress-bar/custom-progress-bar.component';
import { DefaultCardComponent } from './components/default-card/default-card.component';
import { DefaultSectionDescriptionComponent } from './components/default-section-description/default-section-description.component';
import { DefaultSectionFullComponent } from './components/default-section-full/default-section-full.component';
import { DefaulSectionComponent } from './components/default-section/default-section.component';
import { DeleteProfileModalComponent } from './components/delete-profile-modal/delete-profile-modal.component';
import { DirectvChannelsCarouselComponent } from './components/directv-channels-carousel/directv-channels-carousel.component';
import { DirectvgoButtonComponent } from './components/directvgo-button/directvgo-button.component';
import { DirectvgoSecaoInfoComponent } from './components/directvgo-secao-info/directvgo-secao-info.component';
import { DropdownCategoriesComponent } from './components/dropdown-categories/dropdown-categories.component';
import { DropdownFavoritesComponent } from './components/dropdown-favorites/dropdown-favorites.component';
import { DropdownGenderComponent } from './components/dropdown-gender/dropdown-gender.component';
import { DropdownHeaderComponent } from './components/dropdown-header/dropdown-header.component';
import { EpisodesSectionComponent } from './components/episodes-section/episodes-section.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { FeaturedGamesBannerComponent } from './components/featured-games-banner/featured-games-banner.component';
import { FooterMobileComponent } from './components/footer-mobile/footer-mobile.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeCarouselComponent } from './components/home-carousel/home-carousel.component';
import { InputPinComponent } from './components/input-pin/input-pin.component';
import { InputComponent } from './components/input/input.component';
import { KeepWatchingCardComponent } from './components/keep-watching-card/keep-watching-card.component';
import { KeepWatchingSectionComponent } from './components/keep-watching-section/keep-watching-section.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalChannelsComponent } from './components/modal-channels/modal-channels.component';
import { ModalDirectvGoComponent } from './components/modal-directv-go/modal-directv-go.component';
import { ModalNoContentComponent } from './components/modal-no-content/modal-no-content.component';
import { ModalPinComponent } from './components/modal-pin/modal-pin.component';
import { NowCardComponent } from './components/now-card/now-card.component';
import { NowSectionComponent } from './components/now-section/now-section.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { PlayerUIComponent } from './components/player-ui/player-ui.component';
import { ProgramScheduleHeaderComponent } from './components/program-schedule-header/program-schedule-header.component';
import { RentCardComponent } from './components/rent-card/rent-card.component';
import { RentMobilePopupComponent } from './components/rent-mobile-popup/rent-mobile-popup.component';
import { RentSectionComponent } from './components/rent-section/rent-section.component';
import { SeasonSelectorComponent } from './components/season-selector/season-selector.component';
import { SectionSearchResultsCounterComponent } from './components/section-search-results-counter/section-search-results-counter.component';
import { SectionComponent } from './components/section/section.component';
import { SecureSiteCardBadgesComponent } from './components/secure-site-card-badges/secure-site-card-badges.component';
import { SelectComponent } from './components/select/select.component';
import { SeriesBannerComponent } from './components/series-banner/series-banner.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SportsCardComponent } from './components/sports-card/sports-card.component';
import { SportsSectionComponent } from './components/sports-section/sports-section.component';
import { SuccessfulPurchaseComponent } from './components/successful-purchase/successful-purchase.component';
import { SuccessfulRegisterComponent } from './components/successful-register/successful-register.component';
import { ToastSuccessComponent } from './components/toast-success/toast-success.component';
import { ToastComponent } from './components/toast/toast.component';
import { TvProgramScheduledCardComponent } from './components/tv-program-scheduled-card/tv-program-scheduled-card.component';
import { TvProgramScheduledSectionComponent } from './components/tv-program-scheduled-section/tv-program-scheduled-section.component';
import { VideoQualityComponent } from './components/video-quality/video-quality.component';
import { WelcomeCarouselComponent } from './components/welcome-carousel/welcome-carousel.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { MaterialModule } from './material.module';
import { CurrencyFormat } from './pipes/currency-format.pipe';
import { DirectvGoSectionComponent } from './components/directv-go-section/directv-go-section.component';
import { SectionParamountComponent } from './components/section-paramount/section-paramount.component';
import { HboMaxSectionComponent } from './components/hbo-max-section/hbo-max-section.component';
import { CardEpisodeSeasonComponent } from './components/card-episode-season/card-episode-season.component';
import { DefaultSectionFullChannelComponent } from './components/default-section-full-channel/default-section-full-channel.component';
import { DefaultSectionSeasonComponent } from './components/default-section-season/default-section-season.component';
import { ContinueButtonComponent } from './components/continue-button/continue-button.component';
import { SectionEpisodeSeasonComponent } from './components/section-episode-season/section-episode-season.component';
import { DevelopmentToolsComponent } from './components/development-tools/development-tools.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderUnloggedComponent } from './components/header-unlogged/header-unlogged.component';
import { ExclusiveContentComponent } from './components/exclusive-content/exclusive-content.component';
import { ToastDownloadAppComponent } from './components/toast-download-app/toast-download-app.component';
import { ChoosePaymentComponent } from './components/choose-payment/choose-payment.component';
import { PlanButtonComponent } from './components/plan-button/plan-button.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationModalComponent } from './components/notification/notification-modal/notification-modal.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NsportsWaitModalComponent } from './components/nsports-wait-modal/nsports-wait-modal.component';
import { BannerComponent } from './components/libertadores/banner/banner.component';
import { LibertadoresSectionComponent } from './components/libertadores/libertadores-section/libertadores-section.component';
import { SectionLibertadoresComponent } from '../paramount/section-libertadores/section-libertadores/section-libertadores.component';
import { MatchesComponent } from '../libertadores/matches/matches/matches.component';
import { PhasesComponent } from '../libertadores/phases/phases.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MostWatchedChannelsComponent } from './components/most-watched-channels/most-watched-channels.component';
import { PreSaveTitlesSectionComponent } from './components/pre-save-titles-section/pre-save-titles-section.component';
import { ReminderPreSaveButtonComponent } from './components/reminder-pre-save-button/reminder-pre-save-button.component';
import { PreSaveBannerComponent } from './components/pre-save-titles-section/banner/pre-save-banner/pre-save-banner.component';
import { InternalCardComponent } from './components/pre-save-titles-section/card/internal-card/internal-card.component';
import { GenreItemComponent } from './components/pre-save-titles-section/card/internal-card/genre/genre-item/genre-item.component';
import { PreSaveWarnBellComponent } from './components/pre-save-warn-bell/pre-save-warn-bell.component';
import { HomeCarouselSkeletonsComponent } from './components/home-carousel-skeletons/home-carousel-skeletons.component'

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false
  };
};

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    SecureSiteCardBadgesComponent,
    LoadingComponent,
    SecureSiteCardBadgesComponent,
    SecureSiteCardBadgesComponent,
    SelectComponent,
    CardRoundedComponent,
    ChannelsSectionComponent,
    DefaultCardComponent,
    DefaultSectionDescriptionComponent,
    DefaultSectionFullComponent,
    DefaultSectionFullChannelComponent,
    DefaultSectionSeasonComponent,
    ContinueButtonComponent,
    CardEpisodeSeasonComponent,
    ComingSoonSectionComponent,
    NowSectionComponent,
    NowCardComponent,
    ProgramScheduleHeaderComponent,
    HomeCarouselComponent,
    FooterMobileComponent,
    SectionSearchResultsCounterComponent,
    FeaturedGamesBannerComponent,
    DropdownHeaderComponent,
    FooterMobileComponent,
    TvProgramScheduledCardComponent,
    SportsCardComponent,
    SportsSectionComponent,
    RentCardComponent,
    RentSectionComponent,
    KeepWatchingCardComponent,
    KeepWatchingSectionComponent,
    DropdownCategoriesComponent,
    DropdownFavoritesComponent,
    CensorshipComponent,
    TvProgramScheduledSectionComponent,
    SpinnerComponent,
    FooterMobileComponent,
    DefaulSectionComponent,
    PlayerUIComponent,
    AudioOptionsComponent,
    EpisodesSectionComponent,
    WelcomeCarouselComponent,
    SeasonSelectorComponent,
    CustomProgressBarComponent,
    VideoQualityComponent,
    LoaderComponent,
    SeriesBannerComponent,
    ChooseAvatarComponent,
    RentMobilePopupComponent,
    DropdownCategoriesComponent,
    ChooseAvatarComponent,
    SuccessfulPurchaseComponent,
    SuccessfulRegisterComponent,
    DropdownGenderComponent,
    ConfirmationModalComponent,
    DeleteProfileModalComponent,
    PlayButtonComponent,
    HeaderMobileComponent,
    CardComponent,
    FavoriteButtonComponent,
    SectionComponent,
    CardWatchButtonComponent,
    ChipComponent,
    ModalChannelsComponent,
    CensorshipSmallComponent,
    CheckboxComponent,
    WhatsappButtonComponent,
    LanguageSelectorComponent,
    CurrencyFormat,
    ToastComponent,
    CardCorouselComponent,
    CorouselComponent,
    ModalDirectvGoComponent,
    DirectvgoSecaoInfoComponent,
    DirectvgoButtonComponent,
    DirectvChannelsCarouselComponent,
    CheckConnectionComponent,
    InputPinComponent,
    ModalPinComponent,
    ToastSuccessComponent,
    InfoBubbleComponent,
    SectionEpisodeSeasonComponent,
    ModalNoContentComponent,
    DirectvGoSectionComponent,
    SectionParamountComponent,
    HboMaxSectionComponent,
    DevelopmentToolsComponent,
    HeaderUnloggedComponent,
    ExclusiveContentComponent,
    ToastDownloadAppComponent,
    ChoosePaymentComponent,
    PlanButtonComponent,
    SideBarComponent,
    NsportsWaitModalComponent,
    MostWatchedChannelsComponent,
    PreSaveTitlesSectionComponent,
    ReminderPreSaveButtonComponent,
    PreSaveBannerComponent,
    InternalCardComponent,
    GenreItemComponent,
    PreSaveWarnBellComponent,
    NotificationComponent,
    NotificationModalComponent,
    LoadWatchComponent,
    HomeCarouselSkeletonsComponent,
    BannerComponent,
    LibertadoresSectionComponent,
    SectionLibertadoresComponent,
    MatchesComponent,
    PhasesComponent
  ],
  exports: [
    LoaderComponent,
    FooterComponent,
    HeaderComponent,
    InputComponent,
    ButtonComponent,
    SecureSiteCardBadgesComponent,
    LoadingComponent,
    SecureSiteCardBadgesComponent,
    SecureSiteCardBadgesComponent,
    SelectComponent,
    ChannelsSectionComponent,
    CardRoundedComponent,
    CardEpisodeSeasonComponent,
    DefaultCardComponent,
    DefaultSectionDescriptionComponent,
    DefaultSectionFullComponent,
    DefaultSectionFullChannelComponent,
    DefaultSectionSeasonComponent,
    ContinueButtonComponent,
    ComingSoonSectionComponent,
    NowSectionComponent,
    NowCardComponent,
    ProgramScheduleHeaderComponent,
    HomeCarouselComponent,
    WelcomeCarouselComponent,
    FooterMobileComponent,
    SectionSearchResultsCounterComponent,
    FeaturedGamesBannerComponent,
    DropdownHeaderComponent,
    FooterMobileComponent,
    TvProgramScheduledCardComponent,
    SportsCardComponent,
    SportsSectionComponent,
    RentCardComponent,
    RentSectionComponent,
    KeepWatchingCardComponent,
    KeepWatchingSectionComponent,
    DropdownCategoriesComponent,
    DropdownFavoritesComponent,
    TvProgramScheduledSectionComponent,
    SpinnerComponent,
    SectionEpisodeSeasonComponent,
    DefaulSectionComponent,
    PlayerUIComponent,
    AudioOptionsComponent,
    CensorshipComponent,
    MaterialModule,
    EpisodesSectionComponent,
    SeasonSelectorComponent,
    VideoQualityComponent,
    FormsModule,
    ReactiveFormsModule,
    SeriesBannerComponent,
    CustomProgressBarComponent,
    ChooseAvatarComponent,
    RentMobilePopupComponent,
    SuccessfulPurchaseComponent,
    SuccessfulRegisterComponent,
    DropdownGenderComponent,
    ConfirmationModalComponent,
    DeleteProfileModalComponent,
    PlayButtonComponent,
    HeaderMobileComponent,
    CardComponent,
    FavoriteButtonComponent,
    SectionComponent,
    CardWatchButtonComponent,
    ChipComponent,
    ModalChannelsComponent,
    CensorshipSmallComponent,
    CheckboxComponent,
    WhatsappButtonComponent,
    LanguageSelectorComponent,
    CurrencyFormat,
    ToastComponent,
    CorouselComponent,
    CardCorouselComponent,
    CardCorouselComponent,
    ModalDirectvGoComponent,
    DirectvgoSecaoInfoComponent,
    DirectvgoButtonComponent,
    DirectvChannelsCarouselComponent,
    CheckConnectionComponent,
    InputPinComponent,
    ModalPinComponent,
    ToastSuccessComponent,
    InfoBubbleComponent,
    ModalNoContentComponent,
    DirectvGoSectionComponent,
    SectionParamountComponent,
    HboMaxSectionComponent,
    DevelopmentToolsComponent,
    HeaderUnloggedComponent,
    ExclusiveContentComponent,
    ToastDownloadAppComponent,
    ChoosePaymentComponent,
    NsportsWaitModalComponent,
    MostWatchedChannelsComponent,
    NgxSkeletonLoaderModule,
    PreSaveTitlesSectionComponent,
    ReminderPreSaveButtonComponent,
    PreSaveBannerComponent,
    InternalCardComponent,
    GenreItemComponent,
    PreSaveWarnBellComponent,
    PlanButtonComponent,
    NotificationComponent,
    NotificationModalComponent,
    LoadWatchComponent,
    HomeCarouselSkeletonsComponent,
    BannerComponent,
    LibertadoresSectionComponent,
    SectionLibertadoresComponent,
    MatchesComponent,
    PhasesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    MaterialModule,
    DirectivesModule,
    PipesModule,
    DragDropModule,
    MatExpansionModule,
    NgxSkeletonLoaderModule,
    NgxMaskModule.forRoot(maskConfigFunction)
  ]
})
export class SharedModule {}
