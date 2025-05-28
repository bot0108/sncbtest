<script setup>
import GroupHeader         from '@/components/GroupHeader.vue'
import WelcomeMessage      from '@/components/WelcomeMessage.vue'
import TripSummaryCard     from '@/components/TripSummaryCard.vue'
import GroupSummaryCard    from '@/components/GroupSummaryCard.vue'
import UserInfoCard        from '@/components/UserInfoCard.vue'
import InvoiceInfoCard     from '@/components/InvoiceInfoCard.vue'
import LiveTracking        from '@/components/LiveTracking.vue'
import TravelTipCard       from '@/components/TravelTipCard.vue'
import SharePlatformQR     from '@/components/SharePlatformQR.vue'
import ChatbotWidget       from '@/components/ChatbotWidget.vue'

const onTripChange        = () => {}
const onGroupChange       = () => {}
const onUserInfoChange    = () => {}
const onInvoiceInfoChange = () => {}
</script>

<template>
  <main class="p-6 relative">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Header -->
      <GroupHeader reservationNumber="30000 666 0265" />

      <!-- Welcome / Hero section -->
      <WelcomeMessage
        userName="Louis"
        groupName="Chiro Eppegem"
        reservationNumber="30000 666 0265"
      />

      <!-- 2×2 summary grid -->
      <div class="grid grid-cols-2 gap-6">
        <TripSummaryCard
          from="Gent-Sint-Pieters"
          to="Antwerpen-Centraal"
          datetime="13/01/25, 12:27"
          train="IC 734"
          :onChange="onTripChange"
        />
        <GroupSummaryCard
          :childrenCount="20"
          :teensCount="0"
          :adultsCount="3"
          :childrenPrice="20"
          :teensPrice="0"
          :adultsPrice="18"
          :totalPrice="38"
          :onChange="onGroupChange"
        />
        <UserInfoCard
          name="Margaux Van Linthoudt"
          organization="Chiro Eppegem"
          phone="+32 474 12 34 56"
          email="margaux@mail.com"
          :onChange="onUserInfoChange"
        />
        <InvoiceInfoCard
          organization="Chiro Eppegem vzw"
          address="Adres 123, 4321 Gemeente"
          :onChange="onInvoiceInfoChange"
        />
      </div>

      <!-- Live tracking (anchor target) -->
      <div id="live-tracking">
        <LiveTracking />
      </div>

      <!-- QR and Tips side by side -->
      <div class="grid grid-cols-2 gap-6 mt-6">
        <SharePlatformQR link="https://yourapp.com/group/30000-666-0265" />
        <TravelTipCard
          departureStation="Gent-Sint-Pieters"
          arrivalStation="Antwerp-Central"
          departureIntro="The information below will be completed on the day of departure."
          :departureTips="[
            'Gather with your group 20 minutes in advance.',
            'Use the meeting point at the station entrance.'
          ]"
          :reservedCoach="5"
          :groupSize="23"
          :arrivalTips="[
            'Collect your belongings in time before arrival.',
            'Move your group toward the exit as soon as possible.',
            'We recommend organizing your group starting from Saint-Nicolas station.'
          ]"
          :arrivalDisembarkTips="[
            'Your group includes more than 20 participants. Use both doors when getting off the train.'
          ]"
          :safetyTips="[
            'Keep the group at a safe distance from the tracks.',
            'Always stay behind the line on the platform.',
            'If someone falls onto the tracks, contact SNCB immediately: +32 2 3XX XX XX',
            'Do not board after the train conductor’s signal.'
          ]"
          :emergencyTips="[
            'In case of a strike, check the SNCB website and follow instructions for alternative transport.',
            'If your train is canceled, proceed to the ticket counter or use the SNCB app to rebook.',
            'If reserved seats are occupied, show your reservation confirmation and ask the conductor for assistance.'
          ]"
        />
      </div>
    </div>

    <!-- Always-on chatbot widget -->
    <ChatbotWidget />
  </main>
</template>
