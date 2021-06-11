import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  FeatureCollectionObject: any;
  FeatureObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  name: Scalars['String'];
  heroImg: Scalars['String'];
  dateTime: Scalars['Date'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  eventDetails: Scalars['String'];
  slug: Scalars['String'];
  races: Array<Race>;
};

export type EventDetailsInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  dateTime: Scalars['Date'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  slug: Scalars['String'];
};

export type EventInput = {
  slug: Scalars['String'];
  name: Scalars['String'];
  heroImg?: Maybe<Scalars['Upload']>;
  dateTime: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  eventDetails?: Maybe<Scalars['String']>;
};



export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  createEvent?: Maybe<Event>;
  createRace?: Maybe<Race>;
  deleteEvent?: Maybe<Scalars['String']>;
  deleteRace?: Maybe<Scalars['String']>;
  updateRace?: Maybe<Race>;
  fileUpload?: Maybe<Scalars['String']>;
  saveHeroImg?: Maybe<Event>;
  saveEventDetails?: Maybe<Event>;
  saveEventDescription?: Maybe<Event>;
};


export type MutationCreateEventArgs = {
  event: EventInput;
};


export type MutationCreateRaceArgs = {
  eventId: Scalars['String'];
  race: RaceInput;
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['String'];
};


export type MutationDeleteRaceArgs = {
  raceId: Scalars['String'];
};


export type MutationUpdateRaceArgs = {
  raceId: Scalars['String'];
  raceUpdates: UpdateRaceInput;
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};


export type MutationSaveHeroImgArgs = {
  file: Scalars['Upload'];
  id: Scalars['String'];
};


export type MutationSaveEventDetailsArgs = {
  eventDetails: EventDetailsInput;
};


export type MutationSaveEventDescriptionArgs = {
  eventDescription: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Maybe<Event>>;
  eventBySlug?: Maybe<Event>;
  userEvents: Array<Maybe<Event>>;
  userEventByID?: Maybe<Event>;
  userRaceByID?: Maybe<Race>;
  checkSubdomain: Scalars['Boolean'];
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryUserEventByIdArgs = {
  id: Scalars['String'];
};


export type QueryUserRaceByIdArgs = {
  id: Scalars['String'];
};


export type QueryCheckSubdomainArgs = {
  subdomain: Scalars['String'];
};

export type Race = {
  __typename?: 'Race';
  id: Scalars['String'];
  name: Scalars['String'];
  distance: Scalars['Int'];
  route: Route;
  event: Event;
};

export type RaceInput = {
  name: Scalars['String'];
  distance: Scalars['Int'];
  route: RouteInput;
};

export type Route = {
  __typename?: 'Route';
  points: Scalars['FeatureCollectionObject'];
  route: Scalars['FeatureCollectionObject'];
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};

export type RouteInput = {
  points: Scalars['FeatureCollectionObject'];
  route: Scalars['FeatureCollectionObject'];
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};

export type UpdateRaceInput = {
  name?: Maybe<Scalars['String']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<UpdateRouteInput>;
};

export type UpdateRouteInput = {
  points?: Maybe<Scalars['FeatureCollectionObject']>;
  route?: Maybe<Scalars['FeatureCollectionObject']>;
  routeStartMarker?: Maybe<Scalars['FeatureObject']>;
  routeEndMarker?: Maybe<Scalars['FeatureObject']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
};

export type FileUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type FileUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'fileUpload'>
);

export type CreateEventMutationVariables = Exact<{
  event: EventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'name'>
  )> }
);

export type CreateRaceMutationVariables = Exact<{
  eventId: Scalars['String'];
  race: RaceInput;
}>;


export type CreateRaceMutation = (
  { __typename?: 'Mutation' }
  & { createRace?: Maybe<(
    { __typename?: 'Race' }
    & Pick<Race, 'id' | 'name' | 'distance'>
    & { route: (
      { __typename?: 'Route' }
      & Pick<Route, 'points' | 'route' | 'routeStartMarker' | 'routeEndMarker'>
    ) }
  )> }
);

export type UpdateRaceMutationVariables = Exact<{
  raceId: Scalars['String'];
  raceUpdates: UpdateRaceInput;
}>;


export type UpdateRaceMutation = (
  { __typename?: 'Mutation' }
  & { updateRace?: Maybe<(
    { __typename?: 'Race' }
    & Pick<Race, 'id' | 'name' | 'distance'>
    & { route: (
      { __typename?: 'Route' }
      & Pick<Route, 'points' | 'route' | 'routeStartMarker' | 'routeEndMarker'>
    ) }
  )> }
);

export type DeleteRaceMutationVariables = Exact<{
  raceId: Scalars['String'];
}>;


export type DeleteRaceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRace'>
);

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteEvent'>
);

export type UserEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserEventsQuery = (
  { __typename?: 'Query' }
  & { userEvents: Array<Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state' | 'slug'>
  )>> }
);

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: Array<Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state' | 'slug'>
    & { races: Array<(
      { __typename?: 'Race' }
      & Pick<Race, 'id' | 'name' | 'distance'>
    )> }
  )>> }
);

export type UserEventByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserEventByIdQuery = (
  { __typename?: 'Query' }
  & { userEventByID?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state' | 'eventDetails' | 'heroImg' | 'slug'>
    & { races: Array<(
      { __typename?: 'Race' }
      & Pick<Race, 'id' | 'name' | 'distance'>
    )> }
  )> }
);

export type UserRaceByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserRaceByIdQuery = (
  { __typename?: 'Query' }
  & { userRaceByID?: Maybe<(
    { __typename?: 'Race' }
    & Pick<Race, 'id' | 'name' | 'distance'>
    & { route: (
      { __typename?: 'Route' }
      & Pick<Route, 'points' | 'route' | 'routeStartMarker' | 'routeEndMarker'>
    ), event: (
      { __typename?: 'Event' }
      & Pick<Event, 'id'>
    ) }
  )> }
);

export type CheckSubdomainQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type CheckSubdomainQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkSubdomain'>
);

export type SaveHeroImageMutationVariables = Exact<{
  id: Scalars['String'];
  file: Scalars['Upload'];
}>;


export type SaveHeroImageMutation = (
  { __typename?: 'Mutation' }
  & { saveHeroImg?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'heroImg'>
  )> }
);

export type SaveEventDetailsMutationVariables = Exact<{
  eventDetails: EventDetailsInput;
}>;


export type SaveEventDetailsMutation = (
  { __typename?: 'Mutation' }
  & { saveEventDetails?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state' | 'slug'>
  )> }
);

export type SaveEventDescriptionMutationVariables = Exact<{
  id: Scalars['String'];
  eventDescription: Scalars['String'];
}>;


export type SaveEventDescriptionMutation = (
  { __typename?: 'Mutation' }
  & { saveEventDescription?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state' | 'eventDetails'>
  )> }
);

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);


export const FileUploadDocument = gql`
    mutation FileUpload($file: Upload!) {
  fileUpload(file: $file)
}
    `;
export type FileUploadMutationFn = Apollo.MutationFunction<FileUploadMutation, FileUploadMutationVariables>;

/**
 * __useFileUploadMutation__
 *
 * To run a mutation, you first call `useFileUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFileUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fileUploadMutation, { data, loading, error }] = useFileUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useFileUploadMutation(baseOptions?: Apollo.MutationHookOptions<FileUploadMutation, FileUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FileUploadMutation, FileUploadMutationVariables>(FileUploadDocument, options);
      }
export type FileUploadMutationHookResult = ReturnType<typeof useFileUploadMutation>;
export type FileUploadMutationResult = Apollo.MutationResult<FileUploadMutation>;
export type FileUploadMutationOptions = Apollo.BaseMutationOptions<FileUploadMutation, FileUploadMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($event: EventInput!) {
  createEvent(event: $event) {
    name
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateRaceDocument = gql`
    mutation CreateRace($eventId: String!, $race: RaceInput!) {
  createRace(eventId: $eventId, race: $race) {
    id
    name
    distance
    route {
      points
      route
      routeStartMarker
      routeEndMarker
    }
  }
}
    `;
export type CreateRaceMutationFn = Apollo.MutationFunction<CreateRaceMutation, CreateRaceMutationVariables>;

/**
 * __useCreateRaceMutation__
 *
 * To run a mutation, you first call `useCreateRaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRaceMutation, { data, loading, error }] = useCreateRaceMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      race: // value for 'race'
 *   },
 * });
 */
export function useCreateRaceMutation(baseOptions?: Apollo.MutationHookOptions<CreateRaceMutation, CreateRaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRaceMutation, CreateRaceMutationVariables>(CreateRaceDocument, options);
      }
export type CreateRaceMutationHookResult = ReturnType<typeof useCreateRaceMutation>;
export type CreateRaceMutationResult = Apollo.MutationResult<CreateRaceMutation>;
export type CreateRaceMutationOptions = Apollo.BaseMutationOptions<CreateRaceMutation, CreateRaceMutationVariables>;
export const UpdateRaceDocument = gql`
    mutation UpdateRace($raceId: String!, $raceUpdates: UpdateRaceInput!) {
  updateRace(raceId: $raceId, raceUpdates: $raceUpdates) {
    id
    name
    distance
    route {
      points
      route
      routeStartMarker
      routeEndMarker
    }
  }
}
    `;
export type UpdateRaceMutationFn = Apollo.MutationFunction<UpdateRaceMutation, UpdateRaceMutationVariables>;

/**
 * __useUpdateRaceMutation__
 *
 * To run a mutation, you first call `useUpdateRaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRaceMutation, { data, loading, error }] = useUpdateRaceMutation({
 *   variables: {
 *      raceId: // value for 'raceId'
 *      raceUpdates: // value for 'raceUpdates'
 *   },
 * });
 */
export function useUpdateRaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRaceMutation, UpdateRaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRaceMutation, UpdateRaceMutationVariables>(UpdateRaceDocument, options);
      }
export type UpdateRaceMutationHookResult = ReturnType<typeof useUpdateRaceMutation>;
export type UpdateRaceMutationResult = Apollo.MutationResult<UpdateRaceMutation>;
export type UpdateRaceMutationOptions = Apollo.BaseMutationOptions<UpdateRaceMutation, UpdateRaceMutationVariables>;
export const DeleteRaceDocument = gql`
    mutation DeleteRace($raceId: String!) {
  deleteRace(raceId: $raceId)
}
    `;
export type DeleteRaceMutationFn = Apollo.MutationFunction<DeleteRaceMutation, DeleteRaceMutationVariables>;

/**
 * __useDeleteRaceMutation__
 *
 * To run a mutation, you first call `useDeleteRaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRaceMutation, { data, loading, error }] = useDeleteRaceMutation({
 *   variables: {
 *      raceId: // value for 'raceId'
 *   },
 * });
 */
export function useDeleteRaceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRaceMutation, DeleteRaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRaceMutation, DeleteRaceMutationVariables>(DeleteRaceDocument, options);
      }
export type DeleteRaceMutationHookResult = ReturnType<typeof useDeleteRaceMutation>;
export type DeleteRaceMutationResult = Apollo.MutationResult<DeleteRaceMutation>;
export type DeleteRaceMutationOptions = Apollo.BaseMutationOptions<DeleteRaceMutation, DeleteRaceMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: String!) {
  deleteEvent(eventId: $id)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const UserEventsDocument = gql`
    query UserEvents {
  userEvents {
    id
    name
    dateTime
    address
    city
    state
    slug
  }
}
    `;

/**
 * __useUserEventsQuery__
 *
 * To run a query within a React component, call `useUserEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserEventsQuery(baseOptions?: Apollo.QueryHookOptions<UserEventsQuery, UserEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEventsQuery, UserEventsQueryVariables>(UserEventsDocument, options);
      }
export function useUserEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEventsQuery, UserEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEventsQuery, UserEventsQueryVariables>(UserEventsDocument, options);
        }
export type UserEventsQueryHookResult = ReturnType<typeof useUserEventsQuery>;
export type UserEventsLazyQueryHookResult = ReturnType<typeof useUserEventsLazyQuery>;
export type UserEventsQueryResult = Apollo.QueryResult<UserEventsQuery, UserEventsQueryVariables>;
export const EventsDocument = gql`
    query Events {
  events {
    id
    name
    dateTime
    address
    city
    state
    slug
    races {
      id
      name
      distance
    }
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const UserEventByIdDocument = gql`
    query UserEventByID($id: String!) {
  userEventByID(id: $id) {
    id
    name
    dateTime
    address
    city
    state
    eventDetails
    heroImg
    slug
    races {
      id
      name
      distance
    }
  }
}
    `;

/**
 * __useUserEventByIdQuery__
 *
 * To run a query within a React component, call `useUserEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserEventByIdQuery(baseOptions: Apollo.QueryHookOptions<UserEventByIdQuery, UserEventByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEventByIdQuery, UserEventByIdQueryVariables>(UserEventByIdDocument, options);
      }
export function useUserEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEventByIdQuery, UserEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEventByIdQuery, UserEventByIdQueryVariables>(UserEventByIdDocument, options);
        }
export type UserEventByIdQueryHookResult = ReturnType<typeof useUserEventByIdQuery>;
export type UserEventByIdLazyQueryHookResult = ReturnType<typeof useUserEventByIdLazyQuery>;
export type UserEventByIdQueryResult = Apollo.QueryResult<UserEventByIdQuery, UserEventByIdQueryVariables>;
export const UserRaceByIdDocument = gql`
    query UserRaceByID($id: String!) {
  userRaceByID(id: $id) {
    id
    name
    distance
    route {
      points
      route
      routeStartMarker
      routeEndMarker
    }
    event {
      id
    }
  }
}
    `;

/**
 * __useUserRaceByIdQuery__
 *
 * To run a query within a React component, call `useUserRaceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRaceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRaceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserRaceByIdQuery(baseOptions: Apollo.QueryHookOptions<UserRaceByIdQuery, UserRaceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserRaceByIdQuery, UserRaceByIdQueryVariables>(UserRaceByIdDocument, options);
      }
export function useUserRaceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserRaceByIdQuery, UserRaceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserRaceByIdQuery, UserRaceByIdQueryVariables>(UserRaceByIdDocument, options);
        }
export type UserRaceByIdQueryHookResult = ReturnType<typeof useUserRaceByIdQuery>;
export type UserRaceByIdLazyQueryHookResult = ReturnType<typeof useUserRaceByIdLazyQuery>;
export type UserRaceByIdQueryResult = Apollo.QueryResult<UserRaceByIdQuery, UserRaceByIdQueryVariables>;
export const CheckSubdomainDocument = gql`
    query CheckSubdomain($subdomain: String!) {
  checkSubdomain(subdomain: $subdomain)
}
    `;

/**
 * __useCheckSubdomainQuery__
 *
 * To run a query within a React component, call `useCheckSubdomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckSubdomainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckSubdomainQuery({
 *   variables: {
 *      subdomain: // value for 'subdomain'
 *   },
 * });
 */
export function useCheckSubdomainQuery(baseOptions: Apollo.QueryHookOptions<CheckSubdomainQuery, CheckSubdomainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckSubdomainQuery, CheckSubdomainQueryVariables>(CheckSubdomainDocument, options);
      }
export function useCheckSubdomainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckSubdomainQuery, CheckSubdomainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckSubdomainQuery, CheckSubdomainQueryVariables>(CheckSubdomainDocument, options);
        }
export type CheckSubdomainQueryHookResult = ReturnType<typeof useCheckSubdomainQuery>;
export type CheckSubdomainLazyQueryHookResult = ReturnType<typeof useCheckSubdomainLazyQuery>;
export type CheckSubdomainQueryResult = Apollo.QueryResult<CheckSubdomainQuery, CheckSubdomainQueryVariables>;
export const SaveHeroImageDocument = gql`
    mutation SaveHeroImage($id: String!, $file: Upload!) {
  saveHeroImg(id: $id, file: $file) {
    heroImg
  }
}
    `;
export type SaveHeroImageMutationFn = Apollo.MutationFunction<SaveHeroImageMutation, SaveHeroImageMutationVariables>;

/**
 * __useSaveHeroImageMutation__
 *
 * To run a mutation, you first call `useSaveHeroImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveHeroImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveHeroImageMutation, { data, loading, error }] = useSaveHeroImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useSaveHeroImageMutation(baseOptions?: Apollo.MutationHookOptions<SaveHeroImageMutation, SaveHeroImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveHeroImageMutation, SaveHeroImageMutationVariables>(SaveHeroImageDocument, options);
      }
export type SaveHeroImageMutationHookResult = ReturnType<typeof useSaveHeroImageMutation>;
export type SaveHeroImageMutationResult = Apollo.MutationResult<SaveHeroImageMutation>;
export type SaveHeroImageMutationOptions = Apollo.BaseMutationOptions<SaveHeroImageMutation, SaveHeroImageMutationVariables>;
export const SaveEventDetailsDocument = gql`
    mutation SaveEventDetails($eventDetails: EventDetailsInput!) {
  saveEventDetails(eventDetails: $eventDetails) {
    id
    name
    dateTime
    address
    city
    state
    slug
  }
}
    `;
export type SaveEventDetailsMutationFn = Apollo.MutationFunction<SaveEventDetailsMutation, SaveEventDetailsMutationVariables>;

/**
 * __useSaveEventDetailsMutation__
 *
 * To run a mutation, you first call `useSaveEventDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEventDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEventDetailsMutation, { data, loading, error }] = useSaveEventDetailsMutation({
 *   variables: {
 *      eventDetails: // value for 'eventDetails'
 *   },
 * });
 */
export function useSaveEventDetailsMutation(baseOptions?: Apollo.MutationHookOptions<SaveEventDetailsMutation, SaveEventDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveEventDetailsMutation, SaveEventDetailsMutationVariables>(SaveEventDetailsDocument, options);
      }
export type SaveEventDetailsMutationHookResult = ReturnType<typeof useSaveEventDetailsMutation>;
export type SaveEventDetailsMutationResult = Apollo.MutationResult<SaveEventDetailsMutation>;
export type SaveEventDetailsMutationOptions = Apollo.BaseMutationOptions<SaveEventDetailsMutation, SaveEventDetailsMutationVariables>;
export const SaveEventDescriptionDocument = gql`
    mutation SaveEventDescription($id: String!, $eventDescription: String!) {
  saveEventDescription(id: $id, eventDescription: $eventDescription) {
    id
    name
    dateTime
    address
    city
    state
    eventDetails
  }
}
    `;
export type SaveEventDescriptionMutationFn = Apollo.MutationFunction<SaveEventDescriptionMutation, SaveEventDescriptionMutationVariables>;

/**
 * __useSaveEventDescriptionMutation__
 *
 * To run a mutation, you first call `useSaveEventDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEventDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEventDescriptionMutation, { data, loading, error }] = useSaveEventDescriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      eventDescription: // value for 'eventDescription'
 *   },
 * });
 */
export function useSaveEventDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<SaveEventDescriptionMutation, SaveEventDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveEventDescriptionMutation, SaveEventDescriptionMutationVariables>(SaveEventDescriptionDocument, options);
      }
export type SaveEventDescriptionMutationHookResult = ReturnType<typeof useSaveEventDescriptionMutation>;
export type SaveEventDescriptionMutationResult = Apollo.MutationResult<SaveEventDescriptionMutation>;
export type SaveEventDescriptionMutationOptions = Apollo.BaseMutationOptions<SaveEventDescriptionMutation, SaveEventDescriptionMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser {
  createUser {
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;