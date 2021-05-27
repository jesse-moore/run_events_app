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
  races: Array<Maybe<Race>>;
};

export type EventInput = {
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
  fileUpload?: Maybe<Scalars['String']>;
};


export type MutationCreateEventArgs = {
  event: EventInput;
};


export type MutationCreateRaceArgs = {
  eventId?: Maybe<Scalars['String']>;
  race?: Maybe<RaceInput>;
};


export type MutationFileUploadArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  events: Array<Maybe<Event>>;
  eventBySlug?: Maybe<Event>;
  userEvents: Array<Maybe<Event>>;
  userEventByID?: Maybe<Event>;
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryUserEventByIdArgs = {
  id: Scalars['String'];
};

export type Race = {
  __typename?: 'Race';
  type?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<Scalars['String']>;
};

export type RaceInput = {
  type?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['Date']>;
  distance?: Maybe<Scalars['Int']>;
  route?: Maybe<Scalars['String']>;
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

export type UserEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserEventsQuery = (
  { __typename?: 'Query' }
  & { userEvents: Array<Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state'>
  )>> }
);

export type UserEventByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserEventByIdQuery = (
  { __typename?: 'Query' }
  & { userEventByID?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'name' | 'dateTime' | 'address' | 'city' | 'state'>
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
export const UserEventsDocument = gql`
    query UserEvents {
  userEvents {
    id
    name
    dateTime
    address
    city
    state
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
export const UserEventByIdDocument = gql`
    query UserEventByID($id: String!) {
  userEventByID(id: $id) {
    id
    name
    dateTime
    address
    city
    state
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